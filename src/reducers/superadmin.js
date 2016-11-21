import store from 'store';
import { fromJS } from 'immutable';
import { LOGIN_SUCCESS } from '../constants/actions';

const initialState = () => fromJS(store.get('superadmin')) || fromJS({});

export default (state = initialState(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge(fromJS(action.superadmin));
    default:
      return state;
  }
};
