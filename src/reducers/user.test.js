import { fromJS } from 'immutable';
import reducer from './user';
import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';

const profile = {
  lastname: 'Doe',
  bio: 'This is my bio',
  resourceId: null,
  updatedAt: '2016-11-08T18:08:24.000Z',
  id: 1,
  createdAt: '2016-11-08T18:08:24.000Z',
  firstname: 'John',
  email: 'john.doe@mail.com',
  confirmed: true,
};

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
      profile: {
        lastname: 'Doe',
        bio: 'This is my bio',
        resourceId: null,
        updatedAt: '2016-11-08T18:08:24.000Z',
        id: 1,
        createdAt: '2016-11-08T18:08:24.000Z',
        firstname: 'John',
        email: 'john.doe@mail.com',
        confirmed: true,
      },
    }));
  });

  it('should handle USER_FETCH_SUCCESS with previous error', () => {
    expect(reducer(fromJS({
      error: 'User not found.',
      profile: {},
    }), {
      type: USER_FETCH_SUCCESS,
      profile,
    })).toEqual(fromJS({
      error: null,
      profile: {
        lastname: 'Doe',
        bio: 'This is my bio',
        resourceId: null,
        updatedAt: '2016-11-08T18:08:24.000Z',
        id: 1,
        createdAt: '2016-11-08T18:08:24.000Z',
        firstname: 'John',
        email: 'john.doe@mail.com',
        confirmed: true,
      },
    }));
  });

  it('should handle USER_GET_FAILED', () => {
    expect(reducer(undefined, {
      type: USER_GET_FAILED,
      error: 'User not found.',
    })).toEqual(fromJS({
      error: 'User not found.',
      profile: {},
    }));
  });

  it('should handle USER_GET_FAILED with previous profile', () => {
    expect(reducer(fromJS({
      error: null,
      profile,
    }), {
      type: USER_GET_FAILED,
      error: 'User not found.',
    })).toEqual(fromJS({
      error: 'User not found.',
      profile: {
        lastname: 'Doe',
        bio: 'This is my bio',
        resourceId: null,
        updatedAt: '2016-11-08T18:08:24.000Z',
        id: 1,
        createdAt: '2016-11-08T18:08:24.000Z',
        firstname: 'John',
        email: 'john.doe@mail.com',
        confirmed: true,
      },
    }));
  });
});
