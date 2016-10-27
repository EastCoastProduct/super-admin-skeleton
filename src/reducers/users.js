import { fromJS } from 'immutable';
import { USERS_GET_SUCCESS, USERS_GET_FAILED } from '../constants/actions';

const initialState = fromJS({
  error: null,
  list: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_GET_SUCCESS:
      return state.merge(fromJS({
        error: null,
        list: action.list,
      }));
    case USERS_GET_FAILED:
      return state.merge(fromJS({
        error: action.error,
      }));
    default:
      return state;
  }
};
