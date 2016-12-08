import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { error, list, listTotal, page } from '../fixtures/users';
import errResp from '../fixtures/errResp';
import * as users from './users';
import * as parseErrors from '../utils/parseErrors';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';
import { API_URL } from '../constants/application';

describe('users action creators', () => {
  afterEach(() => {
    fetchMock.restore();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
    reduxStore.clearActions();
  });

  const cb = jest.fn();
  const reduxStore = configureMockStore([ thunk ])();
  const expectedSuccessAction = {
    type: USERS_GET_SUCCESS,
    list: list,
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
    expect(users.paginationChange(page)).toEqual({
      type: USERS_PAGINATION_CHANGE,
      page: page,
    });
  });

  it('should make successful users get fetch', () => {
    const resp = {
      count: listTotal,
      rows: list,
    };
    fetchMock.get(`${API_URL}/superAdmin/users?limit=10&page=1`, resp);
    const qs = { limit: 10, page: 1 };

    return reduxStore.dispatch(users.usersGetFetch(qs, cb)).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedSuccessAction);
      expect(cb).toHaveBeenCalled();
    });
  });

  it('should fail to make users get fetch', () => {
    const errMsg = 'Something went wrong.';
    fetchMock.get(`${API_URL}/superAdmin/users?`, errResp(400, errMsg));

    return reduxStore.dispatch(users.usersGetFetch()).then(() => {
      expect(reduxStore.getActions()[0]).toEqual(expectedFailedAction);
    });
  });
});
