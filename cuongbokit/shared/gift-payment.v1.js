/*
 * CuongbokIT Gift Payment Runtime v1.0.0
 *
 * Browser-only runtime. It deliberately does not decide whether a payment is
 * valid: that remains the responsibility of the configured Apps Script API.
 */
(function (global) {
  'use strict';

  var VERSION = '1.0.0';

  function copy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function load(key) {
    try {
      var raw = global.sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function save(key, value) {
    try {
      global.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // A full or disabled sessionStorage must not block the legacy gift flow.
    }
  }

  function remove(key) {
    try {
      global.sessionStorage.removeItem(key);
    } catch (error) {
      // Ignore unavailable browser storage.
    }
  }

  function wait(ms) {
    return new Promise(function (resolve) { global.setTimeout(resolve, ms); });
  }

  function request(url, timeoutMs) {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timeoutId = global.setTimeout(function () {
      if (controller) controller.abort();
    }, timeoutMs);

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
    var pollIntervalMs = config.pollIntervalMs || 5000;
    var requestTimeoutMs = config.requestTimeoutMs || 10000;
    var expiresInMs = config.expiresInMs || 15 * 60 * 1000;
    var swal = config.swal;

    function persist() {
      if (state) save(config.storageKey, state);
    }

    function clearPoll() {
      if (pollTimer) global.clearTimeout(pollTimer);
      pollTimer = null;
    }

    function isExpired() {
      return !state || Date.now() >= state.expiresAt;
    }

    function amount() {
      var value = Number(state.amount);
      return Math.max(Number(config.minAmount) || 0, Number.isFinite(value) ? value : 0);
    }

    function transferContent() {
      return config.transferContent(state);
    }

    function qrUrl() {
      return config.qrUrl(state, amount(), transferContent());
    }

    function popup() {
      return swal.getPopup ? swal.getPopup() : null;
    }

    function setStatus(message, className) {
      var root = popup();
      var status = root && root.querySelector('#gift-payment-status');
      if (!status) return;
      status.className = className || 'gift-payment-status';
      status.textContent = message;
    }

    function updateAmount(value) {
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
      return '' +
        '<div class="gift-payment" data-gift-payment="v1">' +
          '<p class="gift-payment-copy">Quét mã trong app ngân hàng. Khi quay lại trang này, hệ thống sẽ tự kiểm tra giao dịch.</p>' +
          '<label class="gift-payment-label" for="gift-payment-amount">Số tiền donate</label>' +
          '<input id="gift-payment-amount" min="' + (Number(config.minAmount) || 0) + '" type="number" value="' + amount() + '" />' +
          '<div class="gift-payment-qr-wrap"><img alt="Mã QR thanh toán" id="gift-payment-qr" src="' + qrUrl() + '" /></div>' +
          '<p class="gift-payment-summary" id="gift-payment-summary">Nội dung: <b>' + transferContent() + '</b> | <b>' + amount().toLocaleString('vi-VN') + 'đ</b></p>' +
          '<p class="gift-payment-status" id="gift-payment-status">Đang chờ ngân hàng xác nhận…</p>' +
          '<p class="gift-payment-help">Bạn có thể rời sang app ngân hàng và quay lại. Không đổi nội dung chuyển khoản.</p>' +
        '</div>';
    }

    function open(resumed) {
      closedForCompletion = false;
      swal.fire({
        title: (config.title || 'Thanh toán') + ' <small>#' + state.donateId + '</small>',
        html: paymentHtml(),
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: config.cancelText || 'Hủy bỏ',
        customClass: { popup: config.popupClass || '' },
        didOpen: function () {
          var root = popup();
          var amountInput = root && root.querySelector('#gift-payment-amount');
          if (amountInput) {
            amountInput.addEventListener('input', function () { updateAmount(amountInput.value); });
          }
          setStatus(resumed ? 'Đã khôi phục phiên thanh toán. Đang kiểm tra giao dịch…' : 'Đang chờ ngân hàng xác nhận…');
          schedulePoll(resumed ? 0 : (config.initialPollDelayMs || 5000));
        },
        willClose: function () {
          clearPoll();
          if (!closedForCompletion && state && state.status === 'pending') cancel();
        }
      });
    }

    function schedulePoll(delay) {
      clearPoll();
      pollTimer = global.setTimeout(checkPayment, delay);
    }

    function checkPayment() {
      if (!state || !popup() || processing) return;
      if (isExpired()) {
        state.status = 'expired';
        persist();
        setStatus('Phiên thanh toán đã hết hạn. Hãy tạo mã QR mới.', 'gift-payment-status gift-payment-error');
        return;
      }

      request(config.statusUrl(state), requestTimeoutMs)
        .then(function (data) {
          if (!config.isPaid(data, state)) {
            schedulePoll(pollIntervalMs);
            return;
          }

          state.status = 'paid';
          persist();
          processing = true;
          setStatus('Đã nhận thanh toán. Đang tạo link quà…', 'gift-payment-status gift-payment-success');
          return Promise.resolve(config.onPaid(copy(state))).then(function (completed) {
            processing = false;
            if (completed === false) {
              setStatus('Đã nhận thanh toán nhưng chưa tạo được quà. Hãy thử lại.', 'gift-payment-status gift-payment-error');
              return;
            }
            complete();
          });
        })
        .catch(function () {
          processing = false;
          if (state && state.status === 'paid') {
            setStatus('Đã nhận thanh toán. Đang chờ tạo link, vui lòng thử lại.', 'gift-payment-status gift-payment-error');
            return;
          }
          if (state && popup()) schedulePoll(pollIntervalMs);
        });
    }

    function start() {
      if (state && (state.status === 'pending' || state.status === 'paid') && !isExpired()) {
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
      if (!saved || saved.version !== VERSION || saved.giftId !== (config.giftId || '') || saved.status === 'expired') return false;
      state = saved;
      if (isExpired()) {
        state.status = 'expired';
        persist();
        return false;
      }
      open(true);
      return true;
    }

    function cancel() {
      clearPoll();
      state = null;
      processing = false;
      remove(config.storageKey);
    }

    function complete() {
      clearPoll();
      closedForCompletion = true;
      state = null;
      processing = false;
      remove(config.storageKey);
    }

    return { start: start, resume: resume, cancel: cancel, complete: complete, snapshot: function () { return state ? copy(state) : null; } };
  }

  global.GiftPayment = { version: VERSION, create: create };
})(window);
