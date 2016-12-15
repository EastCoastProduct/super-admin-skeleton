import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { superadmin } from '../../fixtures/superadmin';
import { AppComponent } from './';
import * as Actions from '../../actions/auth';

describe('App component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  Actions.logoutAction = jest.fn();
  const wrapper = shallow(
    <AppComponent
      dispatch={jest.fn()}
      router={{ push: jest.fn() }}
      superadmin={fromJS(superadmin)}
    >
      <main>Test</main>
    </AppComponent>
  );
  const instance = wrapper.instance();

  it('handleLogout method', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleLogout(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(Actions.logoutAction).toHaveBeenCalled();
    expect(instance.props.dispatch).toHaveBeenCalled();
    expect(instance.props.router.push).toHaveBeenCalledWith('/login');
  });
});
