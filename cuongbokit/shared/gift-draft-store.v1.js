/*
 * CuongbokIT Gift Draft Store v1.0.0
 *
 * Persists form drafts in IndexedDB. IndexedDB uses structured cloning, so
 * Blob/File values are stored byte-for-byte: this module never re-encodes,
 * crops, resizes, or compresses customer images.
 */
(function (global) {
  'use strict';

  var VERSION = '1.0.0';
  var DB_NAME = 'cuongbokit-gift-drafts-v1';
  var STORE_NAME = 'drafts';
  var DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;
  var MAX_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  var dbPromise = null;

  function isAvailable() {
    return Boolean(global.indexedDB);
  }

  function openDatabase() {
    if (!isAvailable()) return Promise.reject(new Error('IndexedDB is unavailable.'));
    if (dbPromise) return dbPromise;

    dbPromise = new Promise(function (resolve, reject) {
      var request = global.indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = function () {
        var database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME, { keyPath: 'key' });
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error || new Error('Could not open the draft store.')); };
      request.onblocked = function () { reject(new Error('The draft store is blocked by another browser tab.')); };
    });
    return dbPromise;
  }

  function validateKey(key) {
    if (!/^[a-z0-9._-]{3,160}$/i.test(String(key || ''))) throw new Error('Invalid draft key.');
    return String(key);
  }

  function ttl(value) {
    var requested = Number(value);
    if (!Number.isFinite(requested) || requested <= 0) return DEFAULT_TTL_MS;
    return Math.min(requested, MAX_TTL_MS);
  }

  function runTransaction(mode, work) {
    return openDatabase().then(function (database) {
      return new Promise(function (resolve, reject) {
        var transaction = database.transaction(STORE_NAME, mode);
        var store = transaction.objectStore(STORE_NAME);
        var result;
        transaction.oncomplete = function () { resolve(result); };
        transaction.onerror = function () { reject(transaction.error || new Error('Draft store transaction failed.')); };
        transaction.onabort = function () { reject(transaction.error || new Error('Draft store transaction was aborted.')); };
        try { result = work(store, transaction); } catch (error) { transaction.abort(); reject(error); }
      });
    });
  }

  function save(key, data, options) {
    key = validateKey(key);
    options = options || {};
    var now = Date.now();
    var record = {
      key: key,
      version: VERSION,
      savedAt: now,
      expiresAt: now + ttl(options.ttlMs),
      data: data
    };
    return runTransaction('readwrite', function (store) { store.put(record); return true; });
  }

  function remove(key) {
    key = validateKey(key);
    return runTransaction('readwrite', function (store) { store.delete(key); return true; });
  }

  function load(key) {
    key = validateKey(key);
    return openDatabase().then(function (database) {
      return new Promise(function (resolve, reject) {
        var transaction = database.transaction(STORE_NAME, 'readwrite');
        var store = transaction.objectStore(STORE_NAME);
        var request = store.get(key);
        var value = null;
        request.onsuccess = function () {
          var record = request.result;
          if (!record) return;
          if (Number(record.expiresAt) <= Date.now()) {
            store.delete(key);
            return;
          }
          value = record.data;
        };
        request.onerror = function () { reject(request.error || new Error('Could not read draft.')); };
        transaction.oncomplete = function () { resolve(value); };
        transaction.onerror = function () { reject(transaction.error || new Error('Draft store transaction failed.')); };
        transaction.onabort = function () { reject(transaction.error || new Error('Draft store transaction was aborted.')); };
      });
    });
  }

  function prune() {
    return runTransaction('readwrite', function (store) {
      var now = Date.now();
      var request = store.openCursor();
      request.onsuccess = function () {
        var cursor = request.result;
        if (!cursor) return;
        if (Number(cursor.value.expiresAt) <= now) cursor.delete();
        cursor.continue();
      };
      return true;
    });
  }

  global.GiftDraftStore = {
    version: VERSION,
    isAvailable: isAvailable,
    load: load,
    save: save,
    remove: remove,
    prune: prune
  };
})(window);

