import store from 'store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loginFetch = (values, router) =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/authenticate`, {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((resp) => {
      store.set('token', `Bearer ${resp.token}`);
      store.set('user', resp.user);
      dispatch(loginSuccess(resp.user));
      return router.push('/');
    }).catch(err =>
      Promise.reject(parseErrors(err))
    );

export const logoutAction = router =>
  (dispatch) => {
    store.clear();
    dispatch(logoutSuccess());
    return router.push('/login');
  };
