import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import UsersFiltersForm from './';

jest.mock('redux-form/immutable', () => ({
  Field: 'Field',
  reduxForm: () => component => component,
}));

describe('Pagination component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders required data', () => {
    const tree = renderer.create(
      <UsersFiltersForm
        form="UsersFilters"
        handleFiltersSubmit={() => {}}
        handleSubmit={f => f => f}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with style', () => {
    const style = StyleSheet.create({
      filters: {
        margin: 0,
        padding: 0,
      },
    });
    const tree = renderer.create(
      <UsersFiltersForm
        className={style.filters}
        form="UsersFilters"
        handleFiltersSubmit={() => {}}
        handleSubmit={f => f => f}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
