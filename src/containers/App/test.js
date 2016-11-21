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
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <AppComponent
      dispatch={mockDispatch}
      router={mockRouter}
      superadmin={fromJS({})}
    >{children}</AppComponent>
  );
  const instance = wrapper.instance();
  Actions.logoutAction = jest.fn(cb => cb());

  it('handleLogout method', () => {
    const mockPreventDefault = jest.fn();
    const event = {
      preventDefault: mockPreventDefault,
    };
    instance.handleLogout(event);

    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(Actions.logoutAction).toHaveBeenCalledWith(jasmine.any(Function));
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
