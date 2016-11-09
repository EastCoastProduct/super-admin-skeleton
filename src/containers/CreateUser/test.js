import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { CreateUserComponent, validate } from './';
import * as Actions from '../../actions/user';

describe('CreateUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <CreateUserComponent
      dispatch={mockDispatch}
      handleSubmit={() => {}}
      router={mockRouter}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.userCreateFetch = jest.fn((values, cb) => cb(1));

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

    expect(errors).toEqual({ email: 'Invalid e-mail address.' });
  });

  it('handleUserCreate method', () => {
    const values = fromJS({
      email: 'test@email.com',
    });
    instance.handleUserCreate(values);

    expect(Actions.userCreateFetch)
      .toHaveBeenCalledWith(values, jasmine.any(Function));
    expect(mockRouter.push).toHaveBeenCalledWith('/user/1');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
