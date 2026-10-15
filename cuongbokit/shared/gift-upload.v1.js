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
  var configPromise;

  function error(message) {
    return new Error(message);
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

    for (var index = 0; index < config.imgbbKeys.length; index += 1) {
      var formData = new FormData();
      formData.append('image', file, file.name || 'gift-image');
      try {
        var response = await fetch('https://api.imgbb.com/1/upload?key=' + encodeURIComponent(config.imgbbKeys[index]), {
          method: 'POST',
          body: formData
        });
        var data = await response.json().catch(function () { return null; });
        if (!response.ok || !data || !data.success || !data.data || !data.data.url) {
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
    uploadToImgBb: uploadToImgBb
  });
}(window));
