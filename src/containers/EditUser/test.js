import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile } from '../../fixtures/user';
import { createFile, createFileList } from '../../fixtures/fileAPI';
import { EditUserComponent, validate } from './';
import * as Actions from '../../actions/user';
import { FILE_SIZE_MSG } from '../../constants/errors';

describe('EditUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper.setProps(props);
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.userGetFetch = jest.fn();
  Actions.userUpdateFetch = jest.fn((values, userId, cb) => cb());
  const props = {
    dispatch: jest.fn(),
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

  it('handleUserUpdate method', () => {
    const values = fromJS({
      image: createFileList(),
      firstname: 'John',
      lastname: 'Doe',
      bio: 'This is my bio.',
    });
    wrapper.setProps({
      handleSubmit: cb => cb(values),
    });
    wrapper.find('form').simulate('submit');

    expect(Actions.userUpdateFetch).toHaveBeenCalledWith(values,
      instance.props.params.userId, jasmine.any(Function));
    expect(instance.props.router.push).toHaveBeenCalledWith('/user/1');
    expect(instance.props.dispatch).toHaveBeenCalled();
  });

  it('validate function success', () => {
    const fileList = createFileList([createFile(0.5 * 1024 * 1024)]);
    const values = fromJS({ image: fileList });
    const errors = validate(values);

    expect(errors).toEqual({ image: null });
  });

  it('validate function fail', () => {
    const fileList = createFileList([createFile(2 * 1024 * 1024)]);
    const values = fromJS({ image: fileList });
    const errors = validate(values);

    expect(errors).toEqual({ image: FILE_SIZE_MSG });
  });

  it('handleGetUser method', () => {
    instance.handleGetUser();

    expect(Actions.userGetFetch)
      .toHaveBeenCalledWith(instance.props.params.userId);
    expect(instance.props.dispatch).toHaveBeenCalled();
  });
});
