import { fromJS } from 'immutable';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';

const initialState = fromJS({
  error: null,
  list: [],
  listTotal: 0,
  page: 1,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_GET_SUCCESS:
      return state.merge(fromJS({
        error: null,
        list: action.list,
        listTotal: action.listTotal,
      }));
    case USERS_GET_FAILED:
      return state.merge(fromJS({
        error: action.error,
      }));
    case USERS_PAGINATION_CHANGE:
      return state.merge(fromJS({
        page: action.page,
      }));
    default:
      return state;
  }
};
