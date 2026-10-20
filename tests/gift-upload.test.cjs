const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');

const source = readFileSync(require('node:path').join(__dirname, '../cuongbokit/shared/gift-upload.v1.js'), 'utf8');
const keys = ['a'.repeat(32), 'b'.repeat(32), 'c'.repeat(32)];

function runtime(upload, storage) {
  const calls = [];
  const window = { localStorage: storage };
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
