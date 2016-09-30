import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const rootReducer = combineReducers(fromJS({
  form,
}));

export default rootReducer;
