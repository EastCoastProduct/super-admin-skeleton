import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { superadmin } from '../../fixtures/superadmin';
import Header from './';

describe('Header component', () => {
  const wrapper = shallow(
    <Header handleLogout={jest.fn()} superadmin={fromJS(superadmin)} />
  );
  const instance = wrapper.instance();

  describe('snapshot', () => {
    it('renders basic required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with empty superadmin object', () => {
      const newWrapper = shallow(
        <Header handleLogout={() => {}} superadmin={fromJS({})} />
      );

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    it('handle Logout link click', () => {
      wrapper.find('a').simulate('click');

      expect(instance.props.handleLogout).toHaveBeenCalled();
    });
  });
});
