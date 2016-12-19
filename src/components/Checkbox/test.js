import React from 'react';
import { shallow } from 'enzyme';
import deepMerge from 'deepmerge';
import { StyleSheet } from 'aphrodite/no-important';
import Checkbox from './';

describe('Checkbox component', () => {
  const props = {
    id: 'UsersFilters',
    label: 'This is checkbox',
    input: {
      name: 'checkbox',
      value: false,
      onChange: jest.fn(),
    },
    meta: {},
    onChange: jest.fn(),
  };
  const wrapper = shallow(<Checkbox {...props} />);

  describe('snapshot', () => {
    it('renders basic required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with custom onChange event and checked', () => {
      const newProps = deepMerge(props, {
        input: {
          value: true,
        },
      });
      const newWrapper = shallow(<Checkbox {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders with additional styles and attributes', () => {
      const styles = StyleSheet.create({
        additional: {
          margin: 0,
          padding: 0,
        },
      });
      const newProps = deepMerge(props, {
        className: styles.additional,
        disabled: true,
        type: 'text',
      });
      const wrapper = shallow(<Checkbox {...newProps} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    const instance = wrapper.instance();

    it('trigger onChange event', () => {
      const e = { target: { checked: true } };
      wrapper.find('input').simulate('change', e);
      jest.runAllTimers();

      expect(instance.props.input.onChange).toHaveBeenCalledWith(e);
      expect(instance.props.onChange).toHaveBeenCalled();
    });
  });
});
