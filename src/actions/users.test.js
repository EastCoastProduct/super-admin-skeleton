import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as users from './users';
import * as parseErrors from '../utils/parseErrors';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';
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
  const listTotal = 4;
  const error = 'Something went wrong';
  const mockStore = configureMockStore([ thunk ]);
  const expectedSuccessAction = {
    type: USERS_GET_SUCCESS,
    list,
    listTotal,
  };
  const expectedFailedAction = {
    type: USERS_GET_FAILED,
    error,
  };

  it('should create an action for successful users get action', () => {
    expect(users.usersGetSuccess(list, listTotal))
      .toEqual(expectedSuccessAction);
  });

  it('should create an action for failed users get action', () => {
    expect(users.usersGetFailed(error)).toEqual(expectedFailedAction);
  });

  it('should create an action for pagination change', () => {
    expect(users.paginationChange(5)).toEqual({
      type: USERS_PAGINATION_CHANGE,
      page: 5,
    });
  });

  it('should make successful users get fetch', () => {
    const resp = {
      count: listTotal,
      rows: list,
    };
    fetchMock.get(`${API_URL}/superAdmin/users?limit=10`, resp);
    const reduxStore = mockStore(fromJS({
      users: { error: null, list: [], listTotal: 0, page: 1 },
    }));
    const cb = jest.fn();
    const qs = { limit: 10 };

    return reduxStore.dispatch(users.usersGetFetch(qs, cb)).then(() => {
      expect(cb).toHaveBeenCalled();
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
    fetchMock.get(`${API_URL}/superAdmin/users?`, resp);
    const reduxStore = mockStore(fromJS({
      users: { error: null, list: [], listTotal: 0, page: 1 },
    }));
    spyOn(parseErrors, 'default');

    return reduxStore.dispatch(users.usersGetFetch()).catch(
      () => {
        expect(parseErrors.default)
          .toHaveBeenCalledWith(new Error('Something went wrong'));
      }
    );
  });
});
