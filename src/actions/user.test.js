import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { error, profile } from '../fixtures/user';
import errResp from '../fixtures/errResp';
import * as user from './user';
import * as parseErrors from '../utils/parseErrors';
import * as createFormData from '../utils/createFormData';
import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('user action creators', () => {
  afterEach(() => {
    fetchMock.restore();
    jest.resetAllMocks();
    reduxStore.clearActions();
  });

  createFormData.default = jest.fn();
  parseErrors.default = jest.fn();
  const reduxStore = configureMockStore([ thunk ])();
  const expectedSuccessAction = {
    type: USER_FETCH_SUCCESS,
    profile: profile,
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
    fetchMock.get(`${API_URL}/users/${profile.id}`, profile);

    return reduxStore.dispatch(user.userGetFetch(profile.id)).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
    });
  });

  it('should fail to make user get fetch', () => {
    fetchMock.get(`${API_URL}/users/999`, errResp(404, error));

    return reduxStore.dispatch(user.userGetFetch(999)).catch(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedFailedAction);
    });
  });

  it('should make successful user update fetch', () => {
    const values = fromJS({
      firstname: 'John',
      lastname: 'Doe',
    });
    fetchMock.post(`${API_URL}/users/${profile.id}`, profile);

    return reduxStore.dispatch(user.userUpdateFetch(values, profile.id))
      .then(() => {
        expect(createFormData.default).toHaveBeenCalledWith(values);
        expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
      }
    );
  });

  it('should fail to make user update fetch', () => {
    const values = fromJS({
      bio: 'This is my bio.',
    });
    const errMsg = 'User not found.';
    fetchMock.post(`${API_URL}/users/999`, errResp(404, errMsg));

    return reduxStore.dispatch(user.userUpdateFetch(values, 999)).catch(() => {
      expect(createFormData.default).toHaveBeenCalledWith(values);
      expect(parseErrors.default).toHaveBeenCalledWith(new Error(errMsg));
    });
  });

  it('should make successful user create fetch', () => {
    const values = fromJS({
      email: 'test@email.com',
    });
    fetchMock.post(`${API_URL}/superAdmin/users`, profile);

    return reduxStore.dispatch(user.userCreateFetch(values)).then((resp) => {
      expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
      expect(resp).toEqual(profile.id);
    });
  });

  it('should fail to make user create fetch', () => {
    const values = fromJS({
      email: 'test@email.com',
    });
    const errMsg = 'User already exists.';
    fetchMock.post(`${API_URL}/superAdmin/users`, errResp(400, errMsg));

    return reduxStore.dispatch(user.userCreateFetch(values)).catch(() => {
      expect(parseErrors.default).toHaveBeenCalledWith(new Error(errMsg));
    });
  });
});
