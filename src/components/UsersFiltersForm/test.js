import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet } from 'aphrodite/no-important';
import deepMerge from 'deepmerge';
import { UsersFiltersForm } from './';

describe('UsersFiltersForm component', () => {
  const props = {
    form: 'UsersFilters',
    handleFiltersSubmit: jest.fn(f => f),
    handleSubmit: jest.fn(cb => cb(() => {})),
  };
  const wrapper = shallow(<UsersFiltersForm {...props} />);

  describe('snapshot', () => {
    it('renders required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders required data with style', () => {
      const style = StyleSheet.create({
        additional: {
          margin: 0,
          padding: 0,
        },
      });
      const newProps = deepMerge(props, {
        className: style.additional,
      });
      const newWrapper = shallow(<UsersFiltersForm {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    afterEach(() => {
      jest.resetAllMocks(); // move to before when clearAllMocks gets out
    });
    const instance = wrapper.instance();
    const searchBar = wrapper.find('[name="search"]');

    it('submits on form submit', () => {
      wrapper.find('form').simulate('submit');

      expect(instance.props.handleSubmit)
        .toHaveBeenCalledWith(instance.props.handleFiltersSubmit);
      expect(instance.props.handleFiltersSubmit).toHaveBeenCalled();
    });

    it('tests normalize property function', () => {
      expect(searchBar.props().normalize('John Doe')).toEqual('%John Doe%');
      expect(searchBar.props().normalize('John')).toEqual('%John%');
      expect(searchBar.props().normalize('')).toEqual('%%');
    });

    it('tests format property function', () => {
      expect(searchBar.props().format('%John Doe%')).toEqual('John Doe');
      expect(searchBar.props().format('%John%')).toEqual('John');
      expect(searchBar.props().format('%%')).toEqual('');
    });
  });
});
