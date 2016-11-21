import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from '../constants/actions';
import rootReducer from './';

describe('root reducer', () => {
  const initialState = fromJS({
    form: {},
    superadmin: {},
    user: {
      error: null,
      profile: {},
    },
    users: {
      error: null,
      list: [],
      listTotal: 0,
      page: 1,
    },
  });

  it('should return initial state for combined reducers', () => {
    const store = createStore(rootReducer);
    expect(store.getState()).toEqual(initialState);
  });

  it('should return initial state for logout action', () => {
    const newState = fromJS({
      form: {
        Login: {},
      },
      superadmin: {
        firstname: 'John',
        lastname: 'Doe',
      },
      user: {
        error: null,
        profile: {
          lastname: 'lastname4',
          bio: null,
          resourceId: 2,
          updatedAt: '2016-11-08T18:08:25.000Z',
          id: 5,
          createdAt: '2016-11-08T18:08:25.000Z',
          firstname: 'firstname4',
          image: 'https://link-to-s3.jpg',
          email: 'firstname4.lastname4@mail.com',
          confirmed: true,
        },
      },
      users: {
        error: 'Something went wrong',
        list: [],
        listTotal: 0,
        page: 1,
      },
    });
    expect(rootReducer(newState, { type: LOGOUT_SUCCESS }))
      .toEqual(initialState);
  });
});
