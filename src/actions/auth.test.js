import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from 'store';
import { fromJS } from 'immutable';
import { token, superadmin } from '../fixtures/superadmin';
import errResp from '../fixtures/errResp';
import * as auth from './auth';
import * as parseErrors from '../utils/parseErrors';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('auth action creators', () => {
  afterEach(() => {
    fetchMock.restore();
    jest.resetAllMocks();
    reduxStore.clearActions();
  });

  store.set = jest.fn();
  store.clear = jest.fn();
  parseErrors.default = jest.fn();
  const reduxStore = configureMockStore([ thunk ])();
  const expectedLoginAction = {
    type: LOGIN_SUCCESS,
    superadmin,
  };
  const expectedLogoutAction = {
    type: LOGOUT_SUCCESS,
  };

  it('should create an action for successful login', () => {
    expect(auth.loginSuccess(superadmin)).toEqual(expectedLoginAction);
  });

  it('should create an action for successful logout', () => {
    expect(auth.logoutSuccess()).toEqual(expectedLogoutAction);
  });

  it('should make successful login fetch', () => {
    const values = fromJS({
      email: 'super.admin@mail.com',
      password: 'Password123',
    });
    const resp = {
      token,
      user: superadmin,
    };
    fetchMock.post(`${API_URL}/superAdmin/authenticate`, resp);

    return reduxStore.dispatch(auth.loginFetch(values)).then(() => {
      expect(store.set.mock.calls[0])
        .toEqual(['token', `Bearer ${token}`]);
      expect(store.set)
        .toHaveBeenLastCalledWith('superadmin', superadmin);
      expect(store.set).toHaveBeenCalledTimes(2);
      expect(reduxStore.getActions()[0]).toEqual(expectedLoginAction);
    });
  });

  it('should fail to make login fetch', () => {
    const values = fromJS({
      email: 'nouser@mail.com',
      password: 'Aa123456',
    });
    const errMsg = 'User not found.';
    fetchMock.post(`${API_URL}/superAdmin/authenticate`, errResp(404, errMsg));

    return reduxStore.dispatch(auth.loginFetch(values)).catch(() => {
      expect(parseErrors.default).toHaveBeenCalledWith(new Error(errMsg));
    });
  });

  it('should make call to logout action', () => {
    reduxStore.dispatch(auth.logoutAction());

    expect(store.clear).toHaveBeenCalled();
    expect(reduxStore.getActions()[0]).toEqual(expectedLogoutAction);
  });
});
