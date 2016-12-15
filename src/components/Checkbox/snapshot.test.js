import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import Checkbox from './';

describe('Checkbox component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(
      <Checkbox
        id="Form"
        label="This is checkbox"
        input={{ name: 'checkbox', value: false }}
        meta={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom onChange event and checked', () => {
    const tree = renderer.create(
      <Checkbox
        id="Form"
        label="This is checkbox"
        input={{ name: 'checkbox', value: true }}
        meta={{}}
        onChange={() => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with additional styles', () => {
    const styles = StyleSheet.create({
      checkbox: {
        margin: 0,
        padding: 0,
      }
    });
    const tree = renderer.create(
      <Checkbox
        className={styles.checkbox}
        id="Form"
        label="This is checkbox"
        input={{ name: 'checkbox', value: false }}
        meta={{}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
