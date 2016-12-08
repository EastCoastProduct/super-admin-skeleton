import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { CreateUserComponent, validate } from './';
import * as Actions from '../../actions/user';
import { EMAIL_MSG } from '../../constants/errors';

describe('CreateUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper.setProps(props);
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.userCreateFetch = jest.fn((values, cb) => cb(1));
  const props = {
    dispatch: jest.fn(),
    form: 'CreateUser',
    handleSubmit: () => {},
    router: { push: jest.fn() },
    submitting: false,
  };
  const wrapper = shallow(
    <CreateUserComponent {...props} />
  );
  const instance = wrapper.instance();

  it('handleUserCreate method', () => {
    const values = fromJS({
      email: 'test@email.com',
    });
    wrapper.setProps({
      handleSubmit: cb => cb(values),
    });
    wrapper.find('form').simulate('submit');

    expect(Actions.userCreateFetch)
      .toHaveBeenCalledWith(values, jasmine.any(Function));
    expect(instance.props.router.push).toHaveBeenCalledWith('/user/1');
    expect(instance.props.dispatch).toHaveBeenCalled();
  });

  it('validate function success', () => {
    const values = fromJS({
      email: 'test@email.com',
    });
    const errors = validate(values);

    expect(errors).toEqual({ email: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      email: 'notAnEmail',
    });
    const errors = validate(values);

    expect(errors).toEqual({ email: EMAIL_MSG });
  });
});
