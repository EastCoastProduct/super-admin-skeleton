import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import Navigation from './';

describe('Navigation component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders component', () => {
    const tree = renderer.create(<Navigation />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
