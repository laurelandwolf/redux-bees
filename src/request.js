import {serialize} from '@laurelandwolf/data'

export default function request(baseUrl, path, options) {
  return fetch(baseUrl + path, options)
    .then((res) => {
      if (res.status !== 204) {
        return res.json().then(body => [res, body]);
      }
      return Promise.resolve([res, null]);
    })
    .then(([res, body]) => {
      if (res.status >= 200 && res.status < 300) {
        const normalizedResponse = serialize.normalize.response(body)
        return Promise.resolve(normalizedResponse);
      }
      return Promise.reject(body);
    });
};
