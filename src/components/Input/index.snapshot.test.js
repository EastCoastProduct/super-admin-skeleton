import React from 'react';
import renderer from 'react-test-renderer';
import Input from './';

describe('Input component snapshot', () => {
  it('renders basic required data', () => {
    const meta = {
      active: false,
      error: false,
      touched: false,
    };
    const input = {
      name: 'email',
      value: '',
    };
    const tree = renderer.create(<Input meta={meta} input={input} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders label and is focused', () => {
    const meta = {
      active: true,
      error: false,
      touched: true,
    };
    const input = {
      name: 'email',
      value: 'test@email.com',
    };
    const tree = renderer.create(
      <Input meta={meta} input={input} label="Email" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders label and input is required', () => {
    const meta = {
      active: false,
      error: 'Input required',
      touched: true,
    };
    const input = {
      name: 'email',
      value: '',
    };
    const tree = renderer.create(
      <Input meta={meta} input={input} label="Email" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders label and input is invalid', () => {
    const meta = {
      active: false,
      error: 'Input is invalid',
      touched: true,
    };
    const input = {
      name: 'email',
      value: 'notAnEmail',
    };
    const tree = renderer.create(
      <Input meta={meta} input={input} label="Email" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders extra info and it is active and invalid', () => {
    const meta = {
      active: true,
      error: 'Input is invalid',
      touched: true,
    };
    const input = {
      name: 'email',
      value: 'notAnEmail',
    };
    const tree = renderer.create(
      <Input
        meta={meta}
        input={input}
        label="Email"
        type="email"
        placeholder="Email"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
