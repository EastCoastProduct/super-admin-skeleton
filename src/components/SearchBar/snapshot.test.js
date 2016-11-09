import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import SearchBar from './';

describe('SearchBar component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(<SearchBar input={{}} meta={{}} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with additional style and value', () => {
    const style = StyleSheet.create({
      searchBar: {
        margin: 10,
        padding: 10,
      },
    });
    const tree = renderer.create(
      <SearchBar style={style.searchBar} input={{ value: 'name' }} meta={{}} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
