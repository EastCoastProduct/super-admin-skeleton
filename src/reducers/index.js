import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from '../constants/actions';
import superadmin from './superadmin';
import users from './users';

const appReducer = combineReducers(fromJS({
  form,
  superadmin,
  users,
}));

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT_SUCCESS) {
    newState = undefined;
  }

  return appReducer(newState, action);
};

export default rootReducer;
