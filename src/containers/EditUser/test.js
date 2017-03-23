import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile } from '../../fixtures/user';
import { createFile, createFileList } from '../../fixtures/fileAPI';
import { EditUserComponent } from './';
import * as Actions from '../../actions/user';
import { FILE_SIZE_MSG } from '../../constants/errors';

describe('EditUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.userGetFetch = jest.fn();
  Actions.userUpdateFetch = jest.fn();
  const props = {
    dispatch: jest.fn(() => Promise.resolve()),
    form: 'EditUser',
    handleSubmit: () => {},
    params: { userId: 1 },
    profile: fromJS(fullProfile),
    router: { push: jest.fn() },
    submitting: false,
  };
  const wrapper = shallow(
    <EditUserComponent {...props} />
  );
  const instance = wrapper.instance();

  /*
  it('handleUserUpdate method', () => {
    const values = fromJS({
      image: createFileList(),
      firstname: 'John',
      lastname: 'Doe',
      bio: 'This is my bio.',
    });
    const p = instance.handleUserUpdate(values);

    expect(Actions.userUpdateFetch)
      .toHaveBeenCalledWith(values, instance.props.params.userId);
    expect(instance.props.dispatch).toHaveBeenCalled();
    return p.then(() => {
      expect(instance.props.router.push).toHaveBeenCalledWith(
        `/user/${instance.props.params.userId}`);
    });
  });
  */

  it('handleGetUser method', () => {
    instance.handleGetUser();

    expect(Actions.userGetFetch)
      .toHaveBeenCalledWith(instance.props.params.userId);
    expect(instance.props.dispatch).toHaveBeenCalled();
  });
});
