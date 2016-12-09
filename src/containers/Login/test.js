import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { LoginComponent } from './';
import * as Actions from '../../actions/auth';
import { EMAIL_MSG, REQUIRED_MSG } from '../../constants/errors';

describe('Login component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.loginFetch = jest.fn();
  const props = {
    dispatch: jest.fn(() => Promise.resolve()),
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
    const p = instance.handleLogin(values);

    expect(Actions.loginFetch).toHaveBeenCalledWith(values);
    expect(instance.props.dispatch).toHaveBeenCalled();
    return p.then(() => {
      expect(instance.props.router.push).toHaveBeenCalledWith('/');
    });
  });
});
