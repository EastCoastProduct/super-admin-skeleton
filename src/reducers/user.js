import store from 'store';
import { fromJS } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/actions';

const initialState = () => fromJS(store.get('user')) || fromJS({});

export default (state = initialState(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge(fromJS(action.user));
    case LOGOUT_SUCCESS:
      return initialState();
    default:
      return state;
  }
};
