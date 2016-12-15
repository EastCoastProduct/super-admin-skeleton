import { fromJS } from 'immutable';
import reducer from './user';
import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';
import { error, fullProfile, profile } from '../fixtures/user';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({
      error: null,
      profile: {},
    }));
  });

  it('should handle USER_FETCH_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_FETCH_SUCCESS,
      profile,
    })).toEqual(fromJS({
      error: null,
      profile,
    }));
  });

  it('should handle USER_FETCH_SUCCESS with previous profile', () => {
    expect(reducer(fromJS({
      error: null,
      profile: fullProfile,
    }), {
      type: USER_FETCH_SUCCESS,
      profile,
    })).toEqual(fromJS({
      error: null,
      profile,
    }));
  });

  it('should handle USER_FETCH_SUCCESS with previous error', () => {
    expect(reducer(fromJS({
      error,
      profile: {},
    }), {
      type: USER_FETCH_SUCCESS,
      profile,
    })).toEqual(fromJS({
      error: null,
      profile,
    }));
  });

  it('should handle USER_GET_FAILED', () => {
    expect(reducer(undefined, {
      type: USER_GET_FAILED,
      error,
    })).toEqual(fromJS({
      error,
      profile: {},
    }));
  });

  it('should handle USER_GET_FAILED with previous profile and error', () => {
    expect(reducer(fromJS({
      error: 'Something went wrong.',
      profile,
    }), {
      type: USER_GET_FAILED,
      error,
    })).toEqual(fromJS({
      error,
      profile,
    }));
  });
});
