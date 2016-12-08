import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import UsersFiltersForm from './';

jest.mock('redux-form/immutable', () => ({
  Field: 'Field',
  reduxForm: () => component => component,
}));

describe('UsersFiltersForm component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  const wrapper = shallow(
    <UsersFiltersForm
      form="Form"
      handleFiltersSubmit={jest.fn()}
      handleSubmit={jest.fn(cb => cb())}
    />
  );
  const instance = wrapper.instance();
  const searchBar = wrapper.find('[name="search"]')

  it('renders and submits on submit', () => {
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
