import { fromJS } from 'immutable';
import reducer from './superadmin';
import { LOGIN_SUCCESS } from '../constants/actions';
import { superadmin, emptySuperadmin } from '../fixtures/superadmin';

describe('superadmin reducer', () => {
  const superadminMap = fromJS(superadmin);
  const emptySuperadminMap = fromJS(emptySuperadmin);

  it('should return empty initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should return initial state', () => {
    expect(reducer(superadminMap, {})).toEqual(superadminMap);
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer(undefined, {
      type: LOGIN_SUCCESS,
      superadmin,
    })).toEqual(superadminMap);
  });

  it('should handle LOGIN_SUCCESS with previous state', () => {
    expect(reducer(superadminMap, {
      type: LOGIN_SUCCESS,
      superadmin: emptySuperadmin,
    })).toEqual(emptySuperadminMap);
  });
});
