import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from 'store';
import { fromJS } from 'immutable';
import * as auth from './auth';
import * as parseErrors from '../utils/parseErrors';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('auth action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const superadmin = {
    bio: null,
    createdAt: '2016-10-20T10:02:47.000Z',
    email: 'super.admin@mail.com',
    firstname: 'superadmin',
    id: 1,
    lastname: 'superadmin',
    updatedAt: '2016-10-20T10:02:47.000Z',
  };
  const mockStore = configureMockStore([ thunk ]);
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
    store.set = jest.fn();
    const cb = jest.fn();
    const resp = {
      token: 'this.is.token',
      user: superadmin,
    };
    fetchMock.post(`${API_URL}/superAdmin/authenticate`, resp);
    const reduxStore = mockStore(fromJS({ superadmin: {} }));

    return reduxStore.dispatch(auth.loginFetch(values, cb)).then(() => {
      expect(store.set.mock.calls[0])
        .toEqual(['token', `Bearer ${resp.token}`]);
      expect(store.set).toHaveBeenLastCalledWith('superadmin', resp.user);
      expect(store.set).toHaveBeenCalledTimes(2);
      expect(reduxStore.getActions()[0]).toEqual(expectedLoginAction);
      expect(cb).toHaveBeenCalled();
    });
  });

  it('should fail to make login fetch', () => {
    const values = fromJS({
      email: 'nouser@test.com',
      password: 'Aa123456',
    });
    const resp = {
      error: {
        message: 'User not found',
        status: 404,
      },
      message: 'User not found',
    };
    fetchMock.post(`${API_URL}/superAdmin/authenticate`, resp);
    const reduxStore = mockStore(fromJS({ superadmin: {} }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(auth.loginFetch(values)).catch(
      () => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('User not found'));
      }
    );
  });

  it('should make call to logout action', () => {
    store.clear = jest.fn();
    const cb = jest.fn();
    const reduxStore = mockStore(fromJS({ superadmin: {} }));
    reduxStore.dispatch(auth.logoutAction(cb));

    expect(store.clear).toHaveBeenCalled();
    expect(reduxStore.getActions()[0]).toEqual(expectedLogoutAction);
    expect(cb).toHaveBeenCalled();
  });
});
