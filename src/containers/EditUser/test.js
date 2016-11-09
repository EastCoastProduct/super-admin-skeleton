import React from 'react';
import { shallow } from 'enzyme';
import { FileList, File } from 'file-api';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { EditUserComponent, validate } from './';
import * as Actions from '../../actions/user';

describe('EditUser component', () => {
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
  const mockParams = {
    userId: 1,
  };
  const wrapper = shallow(
    <EditUserComponent
      dispatch={mockDispatch}
      handleSubmit={() => {}}
      params={mockParams}
      profile={fromJS({ image: 'link-to-image' })}
      router={mockRouter}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.userGetFetch = jest.fn(() => ({}));
  Actions.userUpdateFetch = jest.fn((values, userId, cb) => cb());

  it('validate function success', () => {
    const files = new FileList(new File('./ecp-logo.png'));
    files[0].size = 0.5 * 1024 * 1024;
    const values = fromJS({
      image: files,
    });
    const errors = validate(values);

    expect(errors).toEqual({ image: null });
  });

  it('validate function fail', () => {
    const files = new FileList(new File('./2mb-image.jpg'));
    files[0].size = 2 * 1024 * 1024;
    const values = fromJS({
      image: files,
    });
    const errors = validate(values);

    expect(errors).toEqual({ image: 'Max file size allowed is 1MB.' });
  });

  it('handleGetUser method', () => {
    instance.handleGetUser();

    expect(Actions.userGetFetch).toHaveBeenCalledWith(mockParams.userId);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handleUserUpdate method', () => {
    const values = fromJS({
      image: new FileList(new File('./ecp-logo.png')),
      firstname: 'John',
      lastname: 'Doe',
      bio: 'This is my bio.',
    });
    instance.handleUserUpdate(values);

    expect(Actions.userUpdateFetch)
      .toHaveBeenCalledWith(values, mockParams.userId, jasmine.any(Function));
    expect(mockRouter.push).toHaveBeenCalledWith('/user/1');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
