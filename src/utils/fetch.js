import 'whatwg-fetch';
import store from 'store';
import { browserHistory } from 'react-router';

const defaultHeaders = {
  Authorization: store.get('token') || '',
  'Content-Type': 'application/json',
};

const mergeDefaults = (options = {}) => {
  if (options.body instanceof FormData) delete defaultHeaders['Content-Type'];
  return Object.assign({}, options, {
    headers: Object.assign({}, defaultHeaders, options.headers || {}),
  });
};

const parseJSON = res => res.json();

const checkStatus = (res) => {
  if (!res.error) return res;

  const error = new Error(res.message);
  Object.assign(error, res);
  return Promise.reject(error);
};

export default function (url, options) {
  return fetch(url, mergeDefaults(options))
    .then(parseJSON)
    .then(checkStatus)
    .catch((err) => {
      switch (err.error.status) {
        case 401:
          return browserHistory.push('/login');
        default:
          return Promise.reject(err);
      }
    });
}
