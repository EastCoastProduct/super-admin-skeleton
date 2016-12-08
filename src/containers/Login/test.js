import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { LoginComponent, validate } from './';
import * as Actions from '../../actions/auth';
import { EMAIL_MSG, REQUIRED_MSG } from '../../constants/errors';

describe('Login component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper.setProps(props);
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.loginFetch = jest.fn((values, cb) => cb());
  const props = {
    dispatch: jest.fn(),
    form: 'Login',
    handleSubmit: () => {},
    router: { push: jest.fn() },
    submitting: false,
  };
  const wrapper = shallow(
    <LoginComponent {...props} />
  );
  const instance = wrapper.instance();

  it('handleLogin method', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    wrapper.setProps({
      handleSubmit: cb => cb(values),
    });
    wrapper.find('form').simulate('submit');

    expect(Actions.loginFetch)
      .toHaveBeenCalledWith(values, jasmine.any(Function));
    expect(instance.props.router.push).toHaveBeenCalledWith('/');
    expect(instance.props.dispatch).toHaveBeenCalled();
  });

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

    expect(errors).toEqual({ email: EMAIL_MSG, password: REQUIRED_MSG });
  });
});
