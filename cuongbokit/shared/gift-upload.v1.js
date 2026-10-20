/* CuongbokIT client-side image upload runtime v1.
 *
 * The config is deliberately public: browser-direct ImgBB uploads require a
 * browser-visible key. Keep this file free of gift-specific UI and load it
 * only from trusted Creator pages.
 */
(function (global) {
  'use strict';

  var CONFIG_URL = 'https://cuongbokreal.github.io/api/cuongbokit/shared/gift-upload-config.v1.json';
  var KEY_PATTERN = /^[a-f0-9]{32}$/i;
  var DISABLED_KEYS_STORAGE = 'cuongbokit.gift-upload.imgbb-disabled.v1';
  var configPromise;
  // Remember key-specific failures across images and browser reloads.
  var unavailableKeys = Object.create(null);

  function error(message) {
    return new Error(message);
  }

  function loadDisabledKeys() {
    try {
      var saved = JSON.parse(global.localStorage.getItem(DISABLED_KEYS_STORAGE) || '[]');
      if (Array.isArray(saved)) saved.forEach(function (key) {
        if (KEY_PATTERN.test(String(key || ''))) unavailableKeys[key] = true;
      });
    } catch (ignored) { /* Private mode may prevent storage access. */ }
  }

  function disableKey(key) {
    loadDisabledKeys();
    unavailableKeys[key] = true;
    try { global.localStorage.setItem(DISABLED_KEYS_STORAGE, JSON.stringify(Object.keys(unavailableKeys))); }
    catch (ignored) { /* Still skip the key for this page. */ }
  }

  function renderCreateProgress(percent, label) {
    try {
      var root = global.Swal && global.Swal.getPopup && global.Swal.getPopup();
      var status = root && root.querySelector('#gift-payment-status');
      if (!status) return;
      var container = root.querySelector('.gift-create-progress');
      if (!container) {
        container = global.document.createElement('div');
        container.className = 'gift-create-progress';
        container.style.cssText = 'margin:8px 0;text-align:center';
        var text = global.document.createElement('div');
        text.className = 'gift-create-progress-label';
        text.setAttribute('aria-live', 'polite');
        text.style.cssText = 'font-size:12px;line-height:1.4;margin-bottom:4px;color:#475467';
        var bar = global.document.createElement('progress');
        bar.max = 100;
        bar.setAttribute('aria-label', 'Tiến trình tạo link');
        bar.style.cssText = 'display:block;width:100%;height:6px;accent-color:#e83e8c';
        container.appendChild(text);
        container.appendChild(bar);
        status.insertAdjacentElement('afterend', container);
      }
      container.querySelector('.gift-create-progress-label').textContent = label + ' · ' + percent + '%';
      container.querySelector('progress').value = percent;
    } catch (ignored) { /* Progress must never interrupt gift creation. */ }
  }

  function setCreateProgress(completed, total) {
    var count = Math.max(0, Number(total) || 0);
    var done = Math.max(0, Math.min(count, Number(completed) || 0));
    var percent = count ? Math.floor(done / count * 90) : 90;
    renderCreateProgress(percent, done < count ? 'Đang tải ảnh ' + done + '/' + count : 'Đang lưu link');
  }

  function finishCreateProgress() { renderCreateProgress(100, 'Đã tạo link'); }
  function clearCreateProgress() {
    try {
      var root = global.Swal && global.Swal.getPopup && global.Swal.getPopup();
      var node = root && root.querySelector('.gift-create-progress');
      if (node) node.remove();
    } catch (ignored) {}
  }

  function getConfig() {
    if (configPromise) return configPromise;
    // A unique query string makes CDN/browser caches revalidate this public
    // configuration whenever a customer starts an upload session. Changing
    // only gift-upload-config.v1.json is therefore enough to rotate a key.
    configPromise = fetch(CONFIG_URL + '?cacheBust=' + Date.now(), { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw error('Không tải được cấu hình upload.');
        return response.json();
      })
      .then(function (config) {
        var keys = config && config.providers && config.providers.imgbb && config.providers.imgbb.keys;
        if (!Array.isArray(keys)) throw error('Cấu hình ImgBB không hợp lệ.');
        var validKeys = keys.filter(function (key) { return KEY_PATTERN.test(String(key || '')); });
        if (!validKeys.length) throw error('Cấu hình ImgBB chưa có API key khả dụng.');
        return { imgbbKeys: validKeys };
      })
      .catch(function (cause) {
        configPromise = null;
        throw cause;
      });
    return configPromise;
  }

  async function uploadToImgBb(file) {
    if (!file || !(file instanceof Blob)) throw error('Không có ảnh để tải lên.');
    var config = await getConfig();
    var lastError;
    loadDisabledKeys();

    for (var index = 0; index < config.imgbbKeys.length; index += 1) {
      var key = config.imgbbKeys[index];
      if (unavailableKeys[key]) continue;
      var formData = new FormData();
      formData.append('image', file, file.name || 'gift-image');
      try {
        var response = await fetch('https://api.imgbb.com/1/upload?key=' + encodeURIComponent(key), {
          method: 'POST',
          body: formData
        });
        var data = await response.json().catch(function () { return null; });
        if (!response.ok || !data || !data.success || !data.data || !data.data.url) {
          // ImgBB reports its rate limit as HTTP 400 / error code 100.
          // Do not quarantine a key for an invalid image or a network error.
          if ((data && data.error && Number(data.error.code) === 100) ||
              response.status === 429 || response.status === 401) {
            disableKey(key);
          }
          throw error((data && data.error && data.error.message) || ('ImgBB trả về lỗi ' + response.status + '.'));
        }
        return {
          link: data.data.url,
          deletehash: data.data.delete_url || '',
          originalName: file.name || 'gift-image'
        };
      } catch (cause) {
        lastError = cause;
      }
    }
    throw lastError || error('Không có ImgBB API key nào hoạt động.');
  }

  global.GiftUpload = Object.freeze({
    configUrl: CONFIG_URL,
    getConfig: getConfig,
    uploadToImgBb: uploadToImgBb,
    setCreateProgress: setCreateProgress,
    finishCreateProgress: finishCreateProgress,
    clearCreateProgress: clearCreateProgress
  });
}(window));
