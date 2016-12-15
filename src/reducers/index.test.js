import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from '../constants/actions';
import { superadmin } from '../fixtures/superadmin';
import { fullProfile } from '../fixtures/user';
import { error, list, listTotal, page } from '../fixtures/users';
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
      superadmin,
      user: {
        error: null,
        profile: fullProfile,
      },
      users: {
        error,
        list,
        listTotal,
        page,
      },
    });
    expect(rootReducer(newState, { type: LOGOUT_SUCCESS }))
      .toEqual(initialState);
  });
});
