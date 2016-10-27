import { fromJS } from 'immutable';
import reducer from './superadmin';
import { LOGIN_SUCCESS } from '../constants/actions';

const superadmin = {
  bio: null,
  createdAt: '2016-10-20T10:02:47.000Z',
  email: 'super.admin@mail.com',
  firstname: 'superadmin',
  id: 1,
  lastname: 'superadmin',
  updatedAt: '2016-10-20T10:02:47.000Z',
};

describe('user reducer', () => {
  it('should return empty initial state', () => {
    expect(reducer(undefined, {})).toEqual(fromJS({}));
  });

  it('should return initial state', () => {
    expect(reducer(fromJS(superadmin), {})).toEqual(fromJS({
      bio: null,
      createdAt: '2016-10-20T10:02:47.000Z',
      email: 'super.admin@mail.com',
      firstname: 'superadmin',
      id: 1,
      lastname: 'superadmin',
      updatedAt: '2016-10-20T10:02:47.000Z',
    }));
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer(undefined, {
      type: LOGIN_SUCCESS,
      superadmin: superadmin,
    })).toEqual(fromJS({
      bio: null,
      createdAt: '2016-10-20T10:02:47.000Z',
      email: 'super.admin@mail.com',
      firstname: 'superadmin',
      id: 1,
      lastname: 'superadmin',
      updatedAt: '2016-10-20T10:02:47.000Z',
    }));
  });
});
