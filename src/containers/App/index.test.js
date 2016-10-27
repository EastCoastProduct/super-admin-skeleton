import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { AppComponent } from './';
import * as Actions from '../../actions/auth';

describe('App component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const children = <div>Test</div>;
  const mockDispatch = jest.fn();
  const wrapper = shallow(
    <AppComponent
      dispatch={mockDispatch}
      router={{}}
      superadmin={fromJS({})}
    >{children}</AppComponent>
  );
  const instance = wrapper.instance();
  Actions.logoutAction = jest.fn(() => ({}));

  it('handleLogout method', () => {
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    instance.handleLogout(event);

    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(Actions.logoutAction).toHaveBeenCalledWith({});
    expect(mockDispatch).toHaveBeenCalledWith({});
  });
});
