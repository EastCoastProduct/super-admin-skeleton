import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import user from './user';

const rootReducer = combineReducers(fromJS({
  form,
  user,
}));

export default rootReducer;
