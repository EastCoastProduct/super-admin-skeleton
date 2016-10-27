import { USERS_GET_SUCCESS, USERS_GET_FAILED } from '../constants/actions';
import { API_URL } from '../constants/application';
import parseErrors from '../utils/parseErrors';
import fetch from '../utils/fetch';

export const usersGetSuccess = list => ({
  type: USERS_GET_SUCCESS,
  list,
});

export const usersGetFailed = () => ({
  type: USERS_GET_FAILED,
});

export const usersGetFetch = () =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/users`).then(resp =>
      dispatch(usersGetSuccess(resp.users))
    ).catch(err =>
      parseErrors(err)
    );
