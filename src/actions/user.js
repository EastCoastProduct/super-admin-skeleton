import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';
import createFormData from '../utils/createFormData';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

export const userFetchSuccess = profile => ({
  type: USER_FETCH_SUCCESS,
  profile,
});

export const userGetFailed = error => ({
  type: USER_GET_FAILED,
  error,
});

export const userGetFetch = userId =>
  dispatch =>
    fetch(`${API_URL}/users/${userId}`).then(resp =>
      dispatch(userFetchSuccess(resp))
    ).catch(err =>
      dispatch(userGetFailed(err.message))
    );

export const userUpdateFetch = (values, userId, cb) =>
  dispatch =>
    fetch(`${API_URL}/users/${userId}`, {
      method: 'POST',
      body: createFormData(values),
    }).then((resp) => {
      dispatch(userFetchSuccess(resp));
      return typeof cb === 'function' && cb();
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );

export const userCreateFetch = (values, cb) =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/users`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      dispatch(userFetchSuccess(resp));
      return typeof cb === 'function' && cb(resp.id);
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );
