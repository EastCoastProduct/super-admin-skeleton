import React from 'react';
import { shallow } from 'enzyme';
import deepMerge from 'deepmerge';
import Input, { isError } from './';

describe('Input component snapshot', () => {
  const props = {
    id: 'Login',
    input: {
      name: 'email',
    },
    meta: {
      active: false,
      error: false,
      touched: false,
    },
  };
  const extraProps = deepMerge(props, {
    label: 'Email',
    type: 'email',
    validated: true,
  });

  it('renders basic required data', () => {
    const newProps = deepMerge(props, {
      type: 'email',
    });
    const wrapper = shallow(<Input {...newProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeFalsy();
  });

  it('renders label and is focused', () => {
    const newProps = deepMerge(props, {
      id: 'EditUser',
      input: {
        name: 'firstname',
        value: 'John',
      },
      label: 'First Name',
      meta: {
        active: true,
        touched: true,
      },
    });
    const wrapper = shallow(<Input {...newProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeFalsy();
  });

  it('renders label and input is required', () => {
    const newProps = deepMerge(extraProps, {
      meta: {
        error: 'Input required',
        touched: true,
      },
    });
    const wrapper = shallow(<Input {...newProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeTruthy();
  });

  it('renders label and input is invalid', () => {
    const newProps = deepMerge(extraProps, {
      input: {
        value: 'notAnEmail',
      },
      meta: {
        error: 'Input is invalid',
        touched: true,
      },
    });
    const wrapper = shallow(<Input {...newProps} />);

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeTruthy();
  });

  it('renders extra info and it is active and invalid', () => {
    const newProps = deepMerge(extraProps, {
      input: {
        value: 'notAnEmail',
      },
      meta: {
        active: true,
        error: 'Input is invalid',
        touched: true,
      },
      placeholder: 'Email',
    });
    const wrapper = shallow(
      <Input {...newProps} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeFalsy();
  });

  it('renders as textarea with max length', () => {
    const newProps = deepMerge(props, {
      input: {
        name: 'bio',
        value: 'This is my bio',
      },
      label: 'Bio',
      maxLength: '1000',
      meta: {
        touched: true,
      },
      placeholder: 'Bio',
      textarea: true,
    });
    const wrapper = shallow(
      <Input {...newProps} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(isError(newProps.meta)).toBeFalsy();
  });
});
