import { fromJS } from 'immutable';
import reducer from './users';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';

const users = {
  error: 'Something went wrong.',
  list: [{
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@mail.com',
    confirmed: true,
  }, {
    firstname: 'Joe',
    lastname: 'Shmoe',
    email: 'joe.shmoe@mail.com',
    confirmed: true,
  }],
  listTotal: 2,
  page: 1,
};

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
      list: users.list,
      listTotal: users.listTotal,
    })).toEqual(fromJS({
      error: null,
      list: [{
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@mail.com',
        confirmed: true,
      }, {
        firstname: 'Joe',
        lastname: 'Shmoe',
        email: 'joe.shmoe@mail.com',
        confirmed: true,
      }],
      listTotal: 2,
      page: 1,
    }));
  });

  it('should return handle USERS_GET_SUCCESS with previous state', () => {
    expect(reducer(fromJS({
      error: 'No users found.',
      list: [{
        firstname: 'Nick',
        lastname: 'Vick',
        email: 'nick.vick@mail.com',
        confirmed: true,
      }, {
        firstname: 'Mike',
        lastname: 'Dike',
        email: 'mike.dike@mail.com',
        confirmed: true,
      }, {
        firstname: 'Louis',
        lastname: 'Souiss',
        email: 'louiss.souiss@mail.com',
        confirmed: true,
      }],
      listTotal: 3,
      page: 2,
    }), {
      type: USERS_GET_SUCCESS,
      list: users.list,
      listTotal: users.listTotal,
    })).toEqual(fromJS({
      error: null,
      list: [{
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@mail.com',
        confirmed: true,
      }, {
        firstname: 'Joe',
        lastname: 'Shmoe',
        email: 'joe.shmoe@mail.com',
        confirmed: true,
      }],
      listTotal: 2,
      page: 2,
    }));
  });

  it('should handle USERS_GET_FAILED', () => {
    expect(reducer(undefined, {
      type: USERS_GET_FAILED,
      error: users.error,
    })).toEqual(fromJS({
      error: 'Something went wrong.',
      list: [],
      listTotal: 0,
      page: 1,
    }));
  });

  it('should handle USERS_GET_FAILED with previous state', () => {
    expect(reducer(fromJS({
      error: null,
      list: [{
        firstname: 'Nick',
        lastname: 'Vick',
        email: 'nick.vick@mail.com',
        confirmed: true,
      }, {
        firstname: 'Mike',
        lastname: 'Dike',
        email: 'mike.dike@mail.com',
        confirmed: true,
      }, {
        firstname: 'Louis',
        lastname: 'Souiss',
        email: 'louiss.souiss@mail.com',
        confirmed: true,
      }],
      listTotal: 3,
      page: 2,
    }), {
      type: USERS_GET_FAILED,
      error: users.error,
    })).toEqual(fromJS({
      error: 'Something went wrong.',
      list: [{
        firstname: 'Nick',
        lastname: 'Vick',
        email: 'nick.vick@mail.com',
        confirmed: true,
      }, {
        firstname: 'Mike',
        lastname: 'Dike',
        email: 'mike.dike@mail.com',
        confirmed: true,
      }, {
        firstname: 'Louis',
        lastname: 'Souiss',
        email: 'louiss.souiss@mail.com',
        confirmed: true,
      }],
      listTotal: 3,
      page: 2,
    }));
  });

  it('should handle USERS_PAGINATION_CHANGE', () => {
    expect(reducer(undefined, {
      type: USERS_PAGINATION_CHANGE,
      page: 5,
    })).toEqual(fromJS({
      error: null,
      list: [],
      listTotal: 0,
      page: 5,
    }))
  });
});
