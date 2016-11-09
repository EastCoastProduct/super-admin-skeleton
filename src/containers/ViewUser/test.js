import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { ViewUserComponent } from './';
import * as Actions from '../../actions/user';

describe('ViewUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const mockDispatch = jest.fn();
  const mockParams = {
    userId: 1,
  };
  const profile = fromJS({
    image: 'link-to-image',
    email: 'test@email.com',
    firstname: 'John',
    lastname: 'Doe',
    bio: 'This is my bio.',
  });
  const wrapper = shallow(
    <ViewUserComponent
      dispatch={mockDispatch}
      params={mockParams}
      profile={profile}
    />
  );
  const instance = wrapper.instance();
  Actions.userGetFetch = jest.fn();

  it('handleGetUser method', () => {
    instance.handleGetUser();

    expect(Actions.userGetFetch).toHaveBeenCalledWith(mockParams.userId);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
