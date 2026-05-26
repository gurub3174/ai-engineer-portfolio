/*
 * Preloaded via NODE_OPTIONS=--require=... before lhci spawns.
 *
 * chrome-launcher 1.2.1 calls fs.rmSync on its temp dir during destroyTmp(),
 * but on Windows the Chrome child process hasn't always released its file
 * handles by then, throwing EPERM and killing the lhci run after all audits
 * completed. Force fs.rmSync to retry on EPERM/EBUSY/ENOTEMPTY — Node
 * natively supports this via maxRetries/retryDelay; we just need to make
 * those defaults present for callers that don't pass them.
 *
 * If even the retries fail, swallow the error specifically for lighthouse.*
 * temp dirs (audits already completed; the leftover is cosmetic and the
 * OS will reap it on next boot).
 */

const fs = require('node:fs');

const originalRmSync = fs.rmSync;
const originalRm = fs.rm;

fs.rmSync = function patchedRmSync(path, options) {
  const merged = { maxRetries: 5, retryDelay: 200, ...(options || {}) };
  try {
    return originalRmSync.call(fs, path, merged);
  } catch (err) {
    if (
      typeof path === 'string' &&
      /lighthouse\./.test(path) &&
      (err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'ENOTEMPTY')
    ) {
      return;
    }
    throw err;
  }
};

fs.rm = function patchedRm(path, options, callback) {
  let cb = callback;
  let opts = options;
  if (typeof options === 'function') {
    cb = options;
    opts = {};
  }
  const merged = { maxRetries: 5, retryDelay: 200, ...(opts || {}) };
  return originalRm.call(fs, path, merged, (err) => {
    if (
      err &&
      typeof path === 'string' &&
      /lighthouse\./.test(path) &&
      (err.code === 'EPERM' || err.code === 'EBUSY' || err.code === 'ENOTEMPTY')
    ) {
      return cb && cb(null);
    }
    return cb && cb(err);
  });
};
