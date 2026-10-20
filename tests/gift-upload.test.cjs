const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');

const source = readFileSync(require('node:path').join(__dirname, '../cuongbokit/shared/gift-upload.v1.js'), 'utf8');
const keys = ['a'.repeat(32), 'b'.repeat(32), 'c'.repeat(32)];

function runtime(upload, storage, ui = {}) {
  const calls = [];
  const window = { localStorage: storage, ...ui };
  const fetch = async (url) => {
    if (url.includes('gift-upload-config')) {
      return { ok: true, json: async () => ({ providers: { imgbb: { keys } } }) };
    }
    const key = new URL(url).searchParams.get('key');
    calls.push(key);
    return upload(key, calls.length);
  };
  runInNewContext(source, { window, fetch, Blob, FormData, Date, Object, Array, Number, String, Error, encodeURIComponent });
  return { api: window.GiftUpload, calls };
}

const ok = () => ({ ok: true, status: 200, json: async () => ({ success: true, data: { url: 'https://example.test/image' } }) });
const failed = (status, code) => ({ ok: false, status, json: async () => ({ error: { code, message: 'upload failed' } }) });

test('rate-limited keys are skipped for subsequent images', async () => {
  const { api, calls } = runtime((key) => key === keys[0] ? failed(400, 100) : ok());
  await api.uploadToImgBb(new Blob(['first']));
  await api.uploadToImgBb(new Blob(['second']));
  assert.deepEqual(calls, [keys[0], keys[1], keys[1]]);
});

test('image-specific failures do not permanently disable a key', async () => {
  const { api, calls } = runtime((key, count) => count === 1 ? failed(400, 200) : ok());
  await api.uploadToImgBb(new Blob(['first']));
  await api.uploadToImgBb(new Blob(['second']));
  assert.deepEqual(calls, [keys[0], keys[1], keys[0]]);
});

test('all rate-limited keys fail without repeated requests', async () => {
  const { api, calls } = runtime(() => failed(400, 100));
  await assert.rejects(api.uploadToImgBb(new Blob(['first'])));
  await assert.rejects(api.uploadToImgBb(new Blob(['second'])));
  assert.deepEqual(calls, keys);
});

test('disabled keys stay skipped after the page reloads', async () => {
  const data = new Map();
  const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) };
  const first = runtime((key) => key === keys[0] ? failed(400, 100) : ok(), storage);
  await first.api.uploadToImgBb(new Blob(['first']));
  const next = runtime(() => ok(), storage);
  await next.api.uploadToImgBb(new Blob(['second']));
  assert.deepEqual(first.calls, [keys[0], keys[1]]);
  assert.deepEqual(next.calls, [keys[1]]);
});

test('a generic forbidden response does not permanently disable the key', async () => {
  const { api, calls } = runtime((key, count) => count === 1 ? failed(403, 103) : ok());
  await api.uploadToImgBb(new Blob(['first']));
  await api.uploadToImgBb(new Blob(['second']));
  assert.deepEqual(calls, [keys[0], keys[1], keys[0]]);
});

test('popup progress stays below 100 until the link is saved', () => {
  class Element {
    constructor(tag = 'div') { this.tag = tag; this.children = []; this.style = {}; }
    appendChild(child) { this.children.push(child); child.parent = this; }
    setAttribute() {}
    insertAdjacentElement(position, child) { this.parent.appendChild(child); }
    remove() { this.parent.children = this.parent.children.filter(child => child !== this); }
    querySelector(selector) { return this.children.find(child => selector.startsWith('.') ? child.className === selector.slice(1) : child.tag === selector) || null; }
  }
  const root = new Element(), status = new Element();
  root.appendChild(status);
  const find = root.querySelector.bind(root);
  root.querySelector = selector => selector === '#gift-payment-status' ? status : find(selector);
  const { api } = runtime(() => ok(), undefined, { Swal: { getPopup: () => root }, document: { createElement: tag => new Element(tag) } });
  api.setCreateProgress(0, 2);
  const bar = root.querySelector('.gift-create-progress').querySelector('progress');
  assert.equal(bar.value, 0);
  api.setCreateProgress(1, 2); assert.equal(bar.value, 45);
  api.setCreateProgress(2, 2); assert.equal(bar.value, 90);
  api.finishCreateProgress(); assert.equal(bar.value, 100);
  api.clearCreateProgress(); assert.equal(root.querySelector('.gift-create-progress'), null);
});

test('missing or broken popup never interrupts creation', () => {
  const { api } = runtime(() => ok(), undefined, { Swal: { getPopup: () => { throw new Error('closed'); } } });
  assert.doesNotThrow(() => api.setCreateProgress(1, 2));
  assert.doesNotThrow(() => api.finishCreateProgress());
  assert.doesNotThrow(() => api.clearCreateProgress());
});
