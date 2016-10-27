import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as users from './users';
import * as parseErrors from '../utils/parseErrors';
import { USERS_GET_SUCCESS, USERS_GET_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';

describe('users action creators', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  const list = [{
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@mail.com',
    confirmed: true,
  }, {
    firstname: 'John',
    lastname: 'Doe Sr.',
    email: 'john.doe.sr@mail.com',
    confirmed: true,
  }, {
    firstname: 'John',
    lastname: 'Doe Jr.',
    email: 'john.doe.jr@mail.com',
    confirmed: false,
  }, {
    firstname: 'John',
    lastname: 'Doe II',
    email: 'john.doe.ii@mail.com',
    confirmed: true,
  }];
  const mockStore = configureMockStore([ thunk ]);
  const expectedSuccessAction = {
    type: USERS_GET_SUCCESS,
    list,
  };
  const expectedFailedAction = {
    type: USERS_GET_FAILED,
  };

  it('should create an action for successful users get action', () => {
    expect(users.usersGetSuccess(list)).toEqual(expectedSuccessAction);
  });

  it('should create an action for failed users get action', () => {
    expect(users.usersGetFailed()).toEqual(expectedFailedAction);
  });

  it('should make successful users get fetch', () => {
    const resp = {
      users: list,
    };
    fetchMock.get(`${API_URL}/superAdmin/users`, resp);
    const reduxStore = mockStore(fromJS({ users: { error: null, list: [] } }));

    return reduxStore.dispatch(users.usersGetFetch()).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
    });
  });

  it('should fail to make users get fetch', () => {
    const resp = {
      error: {
        message: 'Something went wrong',
        status: 404,
      },
      message: 'Something went wrong',
    };
    fetchMock.get(`${API_URL}/superAdmin/users`, resp);
    const reduxStore = mockStore(fromJS({ users: { error: null, list: [] } }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(users.usersGetFetch()).catch(
      () => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Something went wrong'));
      }
    );
  });
});
