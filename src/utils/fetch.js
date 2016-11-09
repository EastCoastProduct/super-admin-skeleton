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

const parseJSON = resp => resp.json();

export const checkStatus = (resp) => {
  if (!resp.error) return resp;

  const error = new Error(resp.message);
  Object.assign(error, resp);
  return Promise.reject(error);
};

export default function (url, options) {
  return fetch(url, mergeDefaults(options))
    .then(parseJSON)
    .then(checkStatus)
    .catch((err) => {
      if (err.error.status === 401) browserHistory.push('/login');
      return Promise.reject(err);
    });
}
