import { fromJS } from 'immutable';
import reducer from './users';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';
import { error, list, list2, listTotal, listTotal2, page, page2 }
 from '../fixtures/users';

describe('users reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      error: null,
      list: [],
      listTotal: 0,
      page: 1,
    }));
  });

  it('should return handle USERS_GET_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USERS_GET_SUCCESS,
      list,
      listTotal,
    })).toEqual(fromJS({
      error: null,
      list,
      listTotal,
      page: 1,
    }));
  });

  it('should return handle USERS_GET_SUCCESS with previous state', () => {
    expect(reducer(fromJS({
      error,
      list,
      listTotal,
      page,
    }), {
      type: USERS_GET_SUCCESS,
      list: list2,
      listTotal: listTotal2,
    })).toEqual(fromJS({
      error: null,
      list: list2,
      listTotal: listTotal2,
      page,
    }));
  });

  it('should handle USERS_GET_FAILED', () => {
    expect(reducer(undefined, {
      type: USERS_GET_FAILED,
      error,
    })).toEqual(fromJS({
      error,
      list: [],
      listTotal: 0,
      page: 1,
    }));
  });

  it('should handle USERS_GET_FAILED with previous state and error', () => {
    expect(reducer(fromJS({
      error: 'Something went wrong.',
      list,
      listTotal,
      page,
    }), {
      type: USERS_GET_FAILED,
      error,
    })).toEqual(fromJS({
      error,
      list,
      listTotal,
      page,
    }));
  });

  it('should handle USERS_PAGINATION_CHANGE', () => {
    expect(reducer(undefined, {
      type: USERS_PAGINATION_CHANGE,
      page,
    })).toEqual(fromJS({
      error: null,
      list: [],
      listTotal: 0,
      page,
    }))
  });

  it('should handle USERS_PAGINATION_CHANGE with previous state', () => {
    expect(reducer(fromJS({
      error,
      list,
      listTotal,
      page,
    }), {
      type: USERS_PAGINATION_CHANGE,
      page: page2,
    })).toEqual(fromJS({
      error,
      list,
      listTotal,
      page: page2,
    }))
  });
});
