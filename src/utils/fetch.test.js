import store from 'store';
import * as RR from 'react-router';
import { fromJS } from 'immutable';
import createFormData from './createFormData';
import errResp from '../fixtures/errResp';
import fetch, { mergeDefaults } from './fetch';

describe('fetch util', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  store.get = jest.fn(() => 'Bearer this.is.token');
  RR.browserHistory = {
    push: jest.fn(),
  };

  it('mergeDefaults method without FormData', () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        bio: 'This is my bio.',
        firstname: 'John',
        lastname: 'Doe',
      }),
    };

    expect(mergeDefaults(options)).toEqual({
      method: 'POST',
      body: '{"bio":"This is my bio.","firstname":"John","lastname":"Doe"}',
      headers: {
        Authorization: 'Bearer this.is.token',
        'Content-Type': 'application/json',
      },
    });
  });

  it('mergeDefaults method with FormData', () => {
    const formData = createFormData(fromJS({
      bio: 'This is my bio.',
      firstname: 'John',
      lastname: 'Doe',
    }));
    const options = {
      method: 'POST',
      body: formData,
    };

    expect(mergeDefaults(options)).toEqual({
      method: 'POST',
      body: formData,
      headers: {
        Authorization: '',
      },
    });
  });

  /*

  it('checkStatus method with error', () => {
    const promise = checkStatus(errResp(400, 'Something went wrong.'));

    return promise.catch(err =>
      expect(err).toEqual(new Error('Something went wrong.'))
    );
  });

  it('checkStatus method without error', () => {
    const resp = {
      message: 'User created.',
    };

    expect(checkStatus(resp)).toEqual(resp);
  });

  it('fetch with 401 error', () => {
    spyOn(window, 'fetch').and.callFake(() => Promise.reject(errResp(401)));

    return fetch('/users', {}).catch(err =>
      expect(RR.browserHistory.push).toHaveBeenCalledWith('/login'),
    );
  });

  it('fetch with 400 error that isn\'t 401', () => {
    const error = errResp(400);
    spyOn(window, 'fetch').and.callFake(() => Promise.reject(error));

    return fetch('/users', {}).catch(err =>
      expect(err).toEqual(error),
    );
  });

  */
});
