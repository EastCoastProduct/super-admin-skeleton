import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile } from '../../fixtures/user';
import { ViewUserComponent } from './';
import * as Actions from '../../actions/user';

describe('ViewUser component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.resetAllMocks();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  Actions.userGetFetch = jest.fn();
  const wrapper = shallow(
    <ViewUserComponent
      dispatch={jest.fn()}
      params={{ userId: fullProfile.id }}
      profile={fromJS(fullProfile)}
    />
  );
  const instance = wrapper.instance();

  it('handleGetUser method', () => {
    instance.handleGetUser();

    expect(Actions.userGetFetch)
      .toHaveBeenCalledWith(instance.props.params.userId);
    expect(instance.props.dispatch).toHaveBeenCalled();
  });
});
