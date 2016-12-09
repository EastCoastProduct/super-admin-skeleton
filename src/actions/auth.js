import store from 'store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

export const loginSuccess = superadmin => ({
  type: LOGIN_SUCCESS,
  superadmin,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loginFetch = values =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/authenticate`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      store.set('token', `Bearer ${resp.token}`);
      store.set('superadmin', resp.user);
      return dispatch(loginSuccess(resp.user));
    }).catch(err =>
      Promise.reject(parseErrors(err)),
    );

export const logoutAction = () =>
  (dispatch) => {
    store.clear();
    dispatch(logoutSuccess());
  };
