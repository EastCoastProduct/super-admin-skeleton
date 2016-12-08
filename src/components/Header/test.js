import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { superadmin } from '../../fixtures/superadmin';
import Header from './';

describe('Header component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.resetAllMocks();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const wrapper = shallow(
    <Header handleLogout={jest.fn()} superadmin={fromJS(superadmin)} />
  );
  const instance = wrapper.instance();

  it('handle Logout link click', () => {
    wrapper.find('a').simulate('click');

    expect(instance.props.handleLogout).toHaveBeenCalled();
  });
});
