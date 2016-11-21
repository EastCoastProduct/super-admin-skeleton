import { fromJS } from 'immutable';
import { USER_FETCH_SUCCESS, USER_GET_FAILED } from '../constants/actions';

const initialState = fromJS({
  error: null,
  profile: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return state.merge(fromJS({
        error: null,
        profile: action.profile,
      }));
    case USER_GET_FAILED:
      return state.merge(fromJS({
        error: action.error,
      }));
    default:
      return state;
  }
};
