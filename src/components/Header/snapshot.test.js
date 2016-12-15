import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { superadmin } from '../../fixtures/superadmin';
import Header from './';

describe('Header component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(
      <Header handleLogout={() => {}} superadmin={fromJS(superadmin)} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with empty superadmin object', () => {
    const tree = renderer.create(
      <Header handleLogout={() => {}} superadmin={fromJS({})} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
