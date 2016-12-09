import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { CreateUserComponent } from './';
import * as Actions from '../../actions/user';
import { EMAIL_MSG } from '../../constants/errors';

describe('CreateUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.userCreateFetch = jest.fn();
  const id = 1;
  const props = {
    dispatch: jest.fn(() => Promise.resolve(id)),
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
    const p = instance.handleUserCreate(values);

    expect(Actions.userCreateFetch).toHaveBeenCalledWith(values);
    expect(instance.props.dispatch).toHaveBeenCalled();
    return p.then(() => {
      expect(instance.props.router.push).toHaveBeenCalledWith(`/user/${id}`);
    });
  });
});
