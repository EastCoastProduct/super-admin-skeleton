import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { LoginComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('Login component', () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <LoginComponent
      dispatch={mockDispatch}
      handleSubmit={() => {}}
      router={{}}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.loginFetch = jest.fn(() => ({}));

  it('validate function success', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({ email: null, password: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      email: 'notAnEmail',
      password: undefined,
    });
    const errors = validate(values);

    expect(errors).toEqual({
      email: 'Invalid e-mail address.',
      password: 'Required field.',
    });
  });

  it('handleLogin method', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    instance.handleLogin(values);

    expect(Actions.loginFetch).toHaveBeenCalledWith(values, {});
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
