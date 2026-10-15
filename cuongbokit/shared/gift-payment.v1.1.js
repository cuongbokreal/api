/*
 * CuongbokIT Gift Payment Runtime v1.1.1
 *
 * Browser-only. Payment validity is still decided only by the configured
 * Apps Script endpoint. With manualStart enabled, no transaction request is
 * made until the customer explicitly confirms they have transferred money.
 */
(function (global) {
  'use strict';

  var VERSION = '1.1.1';

  function copy(value) { return JSON.parse(JSON.stringify(value)); }

  function load(key) {
    try { var raw = global.sessionStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (error) { return null; }
  }

  function save(key, value) {
    try { global.sessionStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { /* Storage is an enhancement, never a payment blocker. */ }
  }

  function remove(key) {
    try { global.sessionStorage.removeItem(key); }
    catch (error) { /* Ignore unavailable browser storage. */ }
  }

  function request(url, timeoutMs) {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timeoutId = global.setTimeout(function () { if (controller) controller.abort(); }, timeoutMs);
    return global.fetch(url, controller ? { signal: controller.signal } : {})
      .then(function (response) {
        if (!response.ok) throw new Error('Payment status request failed');
        return response.json();
      })
      .finally(function () { global.clearTimeout(timeoutId); });
  }

  function create(config) {
    if (!config || !config.storageKey || !config.swal || !config.createDonationId || !config.statusUrl || !config.transferContent || !config.qrUrl || !config.isPaid || !config.onPaid) {
      throw new Error('GiftPayment requires storageKey, swal, createDonationId, statusUrl, transferContent, qrUrl, isPaid and onPaid.');
    }

    var state = null;
    var pollTimer = null;
    var processing = false;
    var closedForCompletion = false;
    var manualStart = config.manualStart === true;
    var pollIntervalMs = config.pollIntervalMs || 5000;
    var requestTimeoutMs = config.requestTimeoutMs || 10000;
    var expiresInMs = config.expiresInMs || 15 * 60 * 1000;
    var swal = config.swal;

    function persist() { if (state) save(config.storageKey, state); }
    function clearPoll() { if (pollTimer) global.clearTimeout(pollTimer); pollTimer = null; }
    function isExpired() { return !state || Date.now() >= state.expiresAt; }
    function amount() {
      var value = Number(state.amount);
      return Math.max(Number(config.minAmount) || 0, Number.isFinite(value) ? value : 0);
    }
    function transferContent() { return config.transferContent(state); }
    function qrUrl() { return config.qrUrl(state, amount(), transferContent()); }
    function popup() { return swal.getPopup ? swal.getPopup() : null; }

    function setStatus(message, className) {
      var root = popup();
      var status = root && root.querySelector('#gift-payment-status');
      if (!status) return;
      status.className = className || 'gift-payment-status';
      status.textContent = message;
    }

    function setAction(kind) {
      var root = popup();
      var action = root && root.querySelector('#gift-payment-action');
      if (!action) return;
      if (kind === 'confirm') {
        action.innerHTML = '<button class="gift-payment-confirm" id="gift-payment-confirm" type="button">Tôi đã chuyển khoản — kiểm tra ngay</button>';
        action.querySelector('#gift-payment-confirm').addEventListener('click', beginChecking);
      } else if (kind === 'retry') {
        action.innerHTML = '<button class="gift-payment-confirm" id="gift-payment-retry" type="button">Tạo lại link quà</button>';
        action.querySelector('#gift-payment-retry').addEventListener('click', processPaid);
      } else if (kind === 'checking') {
        action.innerHTML = '<button class="gift-payment-confirm" disabled="disabled" type="button">Đang kiểm tra giao dịch…</button>';
      } else {
        action.innerHTML = '';
      }
    }

    function updateAmount(value) {
      if (!state || state.status !== 'pending') return;
      state.amount = Math.max(Number(config.minAmount) || 0, Number(value) || 0);
      persist();
      var root = popup();
      if (!root) return;
      var qr = root.querySelector('#gift-payment-qr');
      var summary = root.querySelector('#gift-payment-summary');
      if (qr) qr.src = qrUrl();
      if (summary) summary.innerHTML = 'Nội dung: <b>' + transferContent() + '</b> | <b>' + amount().toLocaleString('vi-VN') + 'đ</b>';
    }

    function paymentHtml() {
      var copyText = manualStart
        ? 'Quét mã trong app ngân hàng. Khi đã chuyển khoản xong, bấm nút bên dưới để bắt đầu kiểm tra.'
        : 'Quét mã trong app ngân hàng. Khi quay lại trang này, hệ thống sẽ tự kiểm tra giao dịch.';
      return '' +
        '<div class="gift-payment" data-gift-payment="v1.1">' +
          '<p class="gift-payment-copy">' + copyText + '</p>' +
          '<label class="gift-payment-label" for="gift-payment-amount">Số tiền donate</label>' +
          '<input id="gift-payment-amount" min="' + (Number(config.minAmount) || 0) + '" type="number" value="' + amount() + '" ' + (state.status === 'pending' ? '' : 'disabled="disabled"') + ' />' +
          '<div class="gift-payment-qr-wrap"><img alt="Mã QR thanh toán" id="gift-payment-qr" src="' + qrUrl() + '" /></div>' +
          '<p class="gift-payment-summary" id="gift-payment-summary">Nội dung: <b>' + transferContent() + '</b> | <b>' + amount().toLocaleString('vi-VN') + 'đ</b></p>' +
          '<p class="gift-payment-warning"><strong>Lưu ý:</strong> Không chỉnh sửa nội dung chuyển khoản. Hãy giữ đúng Donate ID và thanh toán ít nhất số tiền trên mã QR; giao dịch thiếu tiền sẽ không tạo được quà.</p>' +
          '<p class="gift-payment-status" id="gift-payment-status"></p>' +
          '<div class="gift-payment-action" id="gift-payment-action"></div>' +
          '<p class="gift-payment-help">Bạn có thể đóng tạm hộp này hoặc quay lại từ app ngân hàng; phiên thanh toán sẽ được khôi phục trong thời hạn còn lại.</p>' +
        '</div>';
    }

    function open(resumed) {
      closedForCompletion = false;
      swal.fire({
        title: (config.title || 'Thanh toán') + ' <small>#' + state.donateId + '</small>',
        html: paymentHtml(),
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: config.cancelText || 'Đóng tạm',
        customClass: { popup: config.popupClass || '' },
        didOpen: function () {
          var root = popup();
          var amountInput = root && root.querySelector('#gift-payment-amount');
          if (amountInput && state.status === 'pending') amountInput.addEventListener('input', function () { updateAmount(amountInput.value); });

          if (state.status === 'checking') {
            setAction('checking');
            setStatus('Đã khôi phục phiên đang kiểm tra giao dịch…');
            schedulePoll(0);
          } else if (state.status === 'paid') {
            setAction('retry');
            setStatus('Đã nhận thanh toán. Bạn có thể tiếp tục tạo link quà.', 'gift-payment-status gift-payment-success');
          } else {
            setAction(manualStart ? 'confirm' : '');
            setStatus(resumed ? 'Đã khôi phục mã QR. Chỉ kiểm tra khi bạn bấm xác nhận.' : 'Sẵn sàng nhận thanh toán.');
            if (!manualStart) beginChecking();
          }
        },
        willClose: function () {
          clearPoll();
          // Keep pending/checking/paid state so a reload or bank-app return can recover it.
          if (!closedForCompletion) persist();
        }
      });
    }

    function schedulePoll(delay) { clearPoll(); pollTimer = global.setTimeout(checkPayment, delay); }

    function beginChecking() {
      if (!state || processing) return;
      if (isExpired()) {
        state.status = 'expired';
        persist();
        setAction('');
        setStatus('Phiên thanh toán đã hết hạn. Hãy tạo mã QR mới.', 'gift-payment-status gift-payment-error');
        return;
      }
      state.status = 'checking';
      state.checkStartedAt = Date.now();
      persist();
      setAction('checking');
      setStatus('Đang kiểm tra giao dịch…');
      schedulePoll(0);
    }

    function processPaid() {
      if (!state || state.status !== 'paid' || processing) return;
      processing = true;
      setAction('');
      setStatus('Đã nhận thanh toán. Đang tạo link quà…', 'gift-payment-status gift-payment-success');
      Promise.resolve(config.onPaid(copy(state))).then(function (completed) {
        processing = false;
        if (completed === false) {
          setAction('retry');
          setStatus('Đã nhận thanh toán nhưng chưa tạo được quà. Bạn có thể thử tạo lại link.', 'gift-payment-status gift-payment-error');
          return;
        }
        complete();
      }).catch(function () {
        processing = false;
        setAction('retry');
        setStatus('Đã nhận thanh toán nhưng chưa tạo được quà. Bạn có thể thử tạo lại link.', 'gift-payment-status gift-payment-error');
      });
    }

    function checkPayment() {
      if (!state || !popup() || processing || state.status !== 'checking') return;
      if (isExpired()) {
        state.status = 'expired';
        persist();
        setAction('');
        setStatus('Phiên thanh toán đã hết hạn. Hãy tạo mã QR mới.', 'gift-payment-status gift-payment-error');
        return;
      }
      request(config.statusUrl(state), requestTimeoutMs).then(function (data) {
        if (!config.isPaid(data, state)) {
          if (typeof config.onUnpaid === 'function') {
            var message = config.onUnpaid(data, state);
            if (message) setStatus(String(message), 'gift-payment-status gift-payment-error');
          }
          schedulePoll(pollIntervalMs);
          return;
        }
        state.status = 'paid';
        persist();
        processPaid();
      }).catch(function () {
        if (state && state.status === 'checking' && popup()) schedulePoll(pollIntervalMs);
      });
    }

    function start() {
      if (state && (state.status === 'pending' || state.status === 'checking' || state.status === 'paid') && !isExpired()) {
        open(true);
        return copy(state);
      }
      state = {
        version: VERSION,
        giftId: config.giftId || '',
        donateId: config.createDonationId(),
        amount: Number(config.minAmount) || 0,
        status: 'pending',
        createdAt: Date.now(),
        expiresAt: Date.now() + expiresInMs
      };
      persist();
      open(false);
      return copy(state);
    }

    function resume() {
      if (state) return false;
      var saved = load(config.storageKey);
      if (!saved || saved.giftId !== (config.giftId || '') || saved.status === 'expired') return false;
      state = saved;
      if (isExpired()) { state.status = 'expired'; persist(); return false; }
      open(true);
      return true;
    }

    function cancel() { clearPoll(); state = null; processing = false; remove(config.storageKey); }
    function complete() { clearPoll(); closedForCompletion = true; state = null; processing = false; remove(config.storageKey); }

    return { start: start, resume: resume, cancel: cancel, complete: complete, snapshot: function () { return state ? copy(state) : null; } };
  }

  global.GiftPayment = { version: VERSION, create: create };
})(window);

