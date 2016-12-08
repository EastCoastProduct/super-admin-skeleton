import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import Input, { isError } from './';

describe('Input component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const meta = {
      active: false,
      error: false,
      touched: false,
    };
    const input = {
      name: 'email',
    };
    const tree = renderer.create(
      <Input id="Form" meta={meta} input={input} type="email" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeFalsy();
  });

  it('renders label and is focused', () => {
    const meta = {
      active: true,
      error: false,
      touched: true,
    };
    const input = {
      name: 'firstname',
      value: 'John',
    };
    const tree = renderer.create(
      <Input id="Form" meta={meta} input={input} label="Email" type="text" />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeFalsy();
  });

  it('renders label and input is required', () => {
    const meta = {
      active: false,
      error: 'Input required',
      touched: true,
    };
    const input = {
      name: 'email',
    };
    const tree = renderer.create(
      <Input
        id="Form"
        meta={meta}
        input={input}
        validated={true}
        label="Email"
        type="email"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeTruthy();
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
      <Input
        id="Form"
        meta={meta}
        input={input}
        validated={true}
        label="Email"
        type="email"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeTruthy();
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
        id="Form"
        meta={meta}
        input={input}
        validated={true}
        label="Email"
        type="email"
        placeholder="Email"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeFalsy();
  });

  it('renders as textarea with max length', () => {
    const meta = {
      active: false,
      error: false,
      touched: true,
    };
    const input = {
      name: 'bio',
      value: 'This is my bio',
    };
    const tree = renderer.create(
      <Input
        id="Form"
        meta={meta}
        input={input}
        textarea={true}
        label="Bio"
        placeholder="Bio"
        maxLength="1000"
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(isError(meta)).toBeFalsy();
  });
});
