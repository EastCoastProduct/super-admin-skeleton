import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { LoginComponent } from './';

jest.mock('redux-form/immutable', () => ({
  Field: 'Field',
  reduxForm: () => component => component,
}));

describe('Login component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders required data', () => {
    const tree = renderer.create(
      <LoginComponent
        dispatch={() => {}}
        form="Login"
        handleSubmit={f => f => f}
        router={{}}
        submitting={true}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with error', () => {
    const tree = renderer.create(
      <LoginComponent
        dispatch={() => {}}
        error="User not found."
        form="Login"
        handleSubmit={f => f => f}
        router={{}}
        submitting={false}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
