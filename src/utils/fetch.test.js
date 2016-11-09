import store from 'store';
import * as RR from 'react-router';
import { fromJS } from 'immutable';
import createFormData from './createFormData';
import fetch, { mergeDefaults, checkStatus } from './fetch';

describe('fetch util', () => {
  afterEach(() => {
    delete global.fetch;
  });
  store.get = jest.fn(() => 'Bearer this.is.token');

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
      body: formData,
    };

    expect(mergeDefaults(options)).toEqual({
      body: formData,
      headers: {
        Authorization: 'Bearer this.is.token',
      },
    });
  });

  it('checkStatus method with error', () => {
    const promise = checkStatus({
      error: {
        message: 'Something went wrong.',
      },
      message: 'Something went wrong.',
    });

    return promise.catch(err =>
      expect(err).toEqual(new Error('Something went wrong.'))
    );
  });

  it('checkStatus method without error', () => {
    const resp = {
      message: 'User created',
    };

    expect(checkStatus(resp)).toEqual(resp);
  });

  it('fetch with 401 error', () => {
    global.fetch = jest.fn(() => Promise.reject({ error: { status: 401 } }));
    RR.browserHistory = {
      push: jest.fn(),
    };

    return fetch('/users', {}).catch(err =>
      expect(RR.browserHistory.push).toHaveBeenCalledWith('/login')
    );
  });

  it('fetch with 400 error that isn\'t 401', () => {
    const error = { error: { status: 404 } };
    global.fetch = jest.fn(() => Promise.reject(error));

    return fetch('/users', {}).catch(err =>
      expect(err).toEqual(error)
    );
  });
});
