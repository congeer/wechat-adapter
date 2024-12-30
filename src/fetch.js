import { readFile } from './readFile';

export const TEXT_FILE_EXTS = /\.(txt|json|html|csv|lua|i18n)/;

export function parseResponse(url, res) {
  let header = res.header || {};
  header = Object.keys(header).reduce((map, key) => {
    map[key.toLowerCase()] = header[key];
    return map;
  }, {});
  return {
    ok: ((res.statusCode / 200) | 0) === 1, // 200-299
    status: res.statusCode,
    statusText: res.statusCode,
    url,
    clone: () => parseResponse(url, res),
    text: () => Promise.resolve(res.data),
    json: () => {
      if (typeof res.data === 'object') return Promise.resolve(res.data);
      let json = {};
      try {
        json = JSON.parse(res.data);
      } catch (err) {
        console.error(err);
      }
      return Promise.resolve(json);
    },
    arrayBuffer: () => {
      return Promise.resolve(res.data);
    },
    headers: {
      keys: () => Object.keys(header),
      entries: () => {
        const all = [];
        for (const key in header) {
          if (Object.prototype.hasOwnProperty.call(header, header, key)) {
            all.push([key, header[key]]);
          }
        }
        return all;
      },
      get: (n) => header[n.toLowerCase()],
      has: (n) => n.toLowerCase() in header,
    },
  };
}

export function parseFileResponse(url, res) {
  return {
    ok: 1, // 200-299
    status: 200,
    statusText: res,
    url,
    clone: () => parseFileResponse(url, res),
    text: () => Promise.resolve(res),
    json: () => {
      if (typeof res === 'object') return Promise.resolve(res);
      let json = {};
      try {
        json = JSON.parse(res);
      } catch (err) {
        console.error(err);
      }
      return Promise.resolve(json);
    },
    arrayBuffer: () => {
      return Promise.resolve(res);
    },
  };
}

export function fetchFunc() {
  // tslint:disable-next-line:no-any
  return (url, options) => {
    options = options || {};
    const dataType = url.match(TEXT_FILE_EXTS) ? 'text' : 'arraybuffer';
    return new Promise((resolve, reject) => {
      if (!url.match(/^https?/)) {
        readFile(url, url.match(TEXT_FILE_EXTS) ? 'utf-8' : undefined)
          .then((res) => {
            resolve(parseFileResponse(url, res));
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        wx.request({
          url,
          method: options.method || 'GET',
          data: options.body,
          header: options.headers,
          dataType,
          responseType: dataType,
          success: (resp) => resolve(parseResponse(url, resp)),
          fail: (err) => reject(err),
        });
      }
    });
  };
}

export default fetchFunc;
