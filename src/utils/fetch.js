import 'whatwg-fetch';
import store from 'store';
import { browserHistory } from 'react-router';

const defaultHeaders = () => ({
  Authorization: store.get('token') || '',
  'Content-Type': 'application/json',
});

export const mergeDefaults = (options = {}) => {
  const headers = defaultHeaders();
  if (options.body instanceof FormData) delete headers['Content-Type'];
  return Object.assign({}, options, {
    headers: Object.assign({}, headers, options.headers || {}),
  });
};

export default function (url, options) {
  return new Promise((resolve, reject) => {
    const resolveRequest = response => response.json().then(resolve);
    const rejectRequest = response => response.json().then((err) => {
      const error = new Error(err.message);
      Object.assign(error, err);
      return reject(error);
    });

    return fetch(url, mergeDefaults(options))
      .then((response) => {
        if (response.ok) return resolveRequest(response);

        switch (response.status) {
          case 401:
            return browserHistory.push('/login');
          default:
            return rejectRequest(response);
        }
      })
      .catch(() =>
        reject('Network error!'),
      );
  });
}
