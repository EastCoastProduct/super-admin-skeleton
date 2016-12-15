import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import ErrorMsg from './';

describe('ErrorMsg component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data without htmlFor', () => {
    const tree = renderer.create(<ErrorMsg>Something went wrong.</ErrorMsg>);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders basic required data with htmlFor', () => {
    const tree = renderer.create(
      <ErrorMsg htmlFor="Login-email">Something went wrong.</ErrorMsg>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with additional styles', () => {
    const styles = StyleSheet.create({
      error: {
        margin: 0,
        padding: 0,
      }
    });
    const tree = renderer.create(
      <ErrorMsg className={styles.error}>Something went wrong.</ErrorMsg>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
