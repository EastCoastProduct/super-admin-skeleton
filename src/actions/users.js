import queryString from 'query-string';
import { USERS_GET_SUCCESS, USERS_GET_FAILED, USERS_PAGINATION_CHANGE }
  from '../constants/actions';
import { API_URL } from '../constants/application';
import fetch from '../utils/fetch';

export const usersGetSuccess = (list, listTotal) => ({
  type: USERS_GET_SUCCESS,
  list,
  listTotal,
});

export const usersGetFailed = error => ({
  type: USERS_GET_FAILED,
  error,
});

export const paginationChange = page => ({
  type: USERS_PAGINATION_CHANGE,
  page,
});

export const usersGetFetch = (qs, cb) =>
  dispatch =>
    fetch(`${API_URL}/superAdmin/users?${queryString.stringify(qs)}`)
      .then((resp) => {
        dispatch(usersGetSuccess(resp.rows, resp.count));
        return typeof cb === 'function' && cb();
      }).catch(err =>
        dispatch(usersGetFailed(err.message))
      );
