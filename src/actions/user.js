import { USER_FETCH_SUCCESS, USER_GET_FAILED, USER_CHANGE_SUCCESS }
  from '../constants/actions';
import { API_URL } from '../constants/application';
import createFormData from '../utils/createFormData';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

export const userFetchSuccess = profile => ({
  type: USER_FETCH_SUCCESS,
  profile,
});

export const userChangeSuccess = responses => ({
  type: USER_CHANGE_SUCCESS,
  responses,
});

export const userGetFailed = error => ({
  type: USER_GET_FAILED,
  error,
});

export const userGetFetch = userId =>
  dispatch =>
    fetch(`${API_URL}/users/${userId}`).then(resp =>
      dispatch(userFetchSuccess(resp)),
    ).catch(err =>
      dispatch(userGetFailed(err.message)),
    );

export const userChangeEmail = (newEmail, userId) =>
  fetch(`${API_URL}/superAdmin/users/${userId}/changeEmail`, {
    method: 'POST',
    body: JSON.stringify({ newEmail }),
  }).then(() => ({
    email: newEmail,
  }));

export const userChangeConfirmed = (confirmed, userId) =>
  fetch(`${API_URL}/superAdmin/users/${userId}/changeStatus`, {
    method: 'POST',
    body: JSON.stringify({ confirmed: confirmed.toString() }),
  }).then(() => ({
    confirmed,
  }));

export const userUpdateData = (values, userId, dispatch) =>
  fetch(`${API_URL}/users/${userId}`, {
    method: 'POST',
    body: createFormData(values),
  }).then(resp =>
    dispatch(userFetchSuccess(resp)),
  );

export const userUpdateFetch = (values, userId, cb) =>
  (dispatch) => {
    const { newEmail, confirmed, data } = values;
    const requests = [];

    if (newEmail) requests.push(userChangeEmail(newEmail, userId));
    if (typeof confirmed === 'boolean') {
      requests.push(userChangeConfirmed(confirmed, userId));
    }

    return Promise.all(requests).then((resp) => {
      if (data.size > 0) return userUpdateData(data, userId, dispatch);
      return resp.length > 0 && dispatch(userChangeSuccess(resp));
    }).then(() =>
      typeof cb === 'function' && cb(),
    ).catch(err =>
      Promise.reject(parseErrors(err)),
    );
  };

export const userCreateFetch = (values, cb) =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/users`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      dispatch(userFetchSuccess(resp));
      return typeof cb === 'function' && cb(resp.id);
    }).catch(err =>
      Promise.reject(parseErrors(err)),
    );
