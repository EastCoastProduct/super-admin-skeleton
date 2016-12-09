import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheet, StyleSheetTestUtils } from 'aphrodite/no-important';
import Pagination from './';

describe('Pagination component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders required data with current page 1', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={1}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={127}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with current page 5', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={5}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={93}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with current page being last', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={8}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={78}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with less than 5 pages', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={2}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={30}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders just message with extra style for small number of items', () => {
    const style = StyleSheet.create({
      pagination: {
        margin: 10,
        padding: 10,
      },
    });
    const tree = renderer.create(
      <Pagination
        currentPage={1}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        className={style.pagination}
        total={5}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders just message for 1 item', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={1}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={1}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('doesn\'t render anything for 0 items', () => {
    const tree = renderer.create(
      <Pagination
        currentPage={1}
        handlePaginationChange={() => {}}
        itemsPerPage={10}
        total={0}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
