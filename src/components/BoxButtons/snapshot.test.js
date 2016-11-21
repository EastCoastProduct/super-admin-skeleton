import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import BoxButtons from './';

describe('BoxButtons component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(
      <BoxButtons disabled={false} link="/users">Create</BoxButtons>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders when button is disabled', () => {
    const tree = renderer.create(
      <BoxButtons disabled={true} link="/user/1">Save</BoxButtons>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
