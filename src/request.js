import camelcaseKeys from 'camelcase-keys'

export default function request(baseUrl, path, options) {
  return fetch(baseUrl + path, options)
    .then((res) => {
      const headers = {};
      res.headers.forEach((value, name) => headers[name] = value);

      const response = {
        status: res.status,
        headers,
      };

      if (res.status !== 204) {
        return res.json().then(body => ({ ...response, body }));
      }

      return Promise.resolve(response);
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const convertedBody = camelcaseKeys(body, {deep: true})
        return Promise.resolve(convertedBody);
      }

      return Promise.reject(response);
    });
};
