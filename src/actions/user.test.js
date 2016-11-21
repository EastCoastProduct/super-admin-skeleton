import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as user from './user';
import * as parseErrors from '../utils/parseErrors';
import * as createFormData from '../utils/createFormData';
import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('user action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const values = fromJS({
    lastname: 'John',
    firstname: 'Doe',
  });
  const profile = {
    lastname: 'Doe',
    bio: null,
    resourceId: null,
    updatedAt: '2016-11-08T18:08:24.000Z',
    id: 3,
    createdAt: '2016-11-08T18:08:24.000Z',
    firstname: 'John',
    email: 'john@doe.com',
    confirmed: true,
  };
  const error = 'User not found';
  const userId = 3;
  const mockStore = configureMockStore([ thunk ]);
  const expectedSuccessAction = {
    type: USER_FETCH_SUCCESS,
    profile,
  };
  const expectedFailedAction = {
    type: USER_GET_FAILED,
    error,
  };

  it('should create an action for successful user fetch action', () => {
    expect(user.userFetchSuccess(profile)).toEqual(expectedSuccessAction);
  });

  it('should create an action for failed user get action', () => {
    expect(user.userGetFailed(error)).toEqual(expectedFailedAction);
  });

  it('should make successful user get fetch', () => {
    const resp = { ...profile };
    fetchMock.get(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));

    return reduxStore.dispatch(user.userGetFetch(userId)).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
    });
  });

  it('should fail to make user get fetch', () => {
    const resp = {
      error: {
        message: 'Something went wrong',
        status: 404,
      },
      message: 'Something went wrong',
    };
    fetchMock.get(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));

    return reduxStore.dispatch(user.userGetFetch(userId)).catch(
      () => {
        expect(reduxStore.getActions()[0]).toEqual(expectedFailedAction);
      }
    );
  });

  it('should make successful user update fetch', () => {
    const resp = { ...profile };
    fetchMock.post(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));
    const cb = jest.fn();
    spyOn(createFormData, 'default');

    return reduxStore.dispatch(user.userUpdateFetch(values, userId, cb))
      .then(() => {
        expect(createFormData.default).toHaveBeenCalledWith(values);
        expect(cb).toHaveBeenCalled();
        expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
      }
    );
  });

  it('should fail to make user get fetch', () => {
    const resp = {
      error: {
        message: 'Something went wrong',
        status: 404,
      },
      message: 'Something went wrong',
    };
    fetchMock.post(`${API_URL}/users/${userId}`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));
    spyOn(createFormData, 'default');
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(user.userUpdateFetch(values, userId))
      .catch(() => {
        expect(createFormData.default).toHaveBeenCalledWith(values);
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Something went wrong'));
      }
    );
  });

  it('should make successful user create fetch', () => {
    const resp = { id: profile.id };
    fetchMock.post(`${API_URL}/superAdmin/users`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));
    const cb = jest.fn();

    return reduxStore.dispatch(user.userCreateFetch(values, cb))
      .then(() => {
        expect(cb).toHaveBeenCalledWith(resp.id);
        expect(reduxStore.getActions()[0]).toEqual({
          type: USER_FETCH_SUCCESS,
          profile: { id: 3 },
        });
      }
    );
  });

  it('should fail to make user create fetch', () => {
    const resp = {
      error: {
        message: 'Something went wrong',
        status: 404,
      },
      message: 'Something went wrong',
    };
    fetchMock.post(`${API_URL}/superAdmin/users`, resp);
    const reduxStore = mockStore(fromJS({
      user: { error: null, profile: {} },
    }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(user.userCreateFetch(values))
      .catch(() => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Something went wrong'));
      }
    );
  });
});
