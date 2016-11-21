import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import Pagination from './';

describe('Pagination component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const mockPaginationChange = jest.fn();
  const wrapper = shallow(
    <Pagination
      currentPage={1}
      itemsPerPage={10}
      onPaginationChange={mockPaginationChange}
      total={127}
    />
  );
  const instance = wrapper.instance();

  it('calculatePagination method', () => {
    instance.calculatePagination({
      itemsPerPage: 5,
      total: 44,
    });
    expect(instance.numOfPages).toBe(9);

    instance.calculatePagination();
    expect(instance.numOfPages).toBe(13);
  });

  it('handleChangePage method', () => {
    instance.handleChangePage(5);

    expect(mockPaginationChange).toHaveBeenCalledWith(5);
  });

  it('clickHandler method', () => {
    instance.handleChangePage = jest.fn();
    const handlerFunction = instance.clickHandler(3);
    handlerFunction();

    expect(instance.handleChangePage).toHaveBeenCalledWith(3);
  });

  it('renderPages method', () => {
    instance.numOfPages = 1;
    expect(instance.renderPages()).toBeFalsy();

    instance.numOfPages = 3;
    expect(instance.renderPages().length).toBe(3);

    instance.numOfPages = 7;
    let elems = instance.renderPages();
    expect(elems.length).toBe(5);
    expect(elems[0].key).toBe('1');
    expect(elems[4].key).toBe('5');

    wrapper.setProps({
      currentPage: 5,
    });
    instance.numOfPages = 13;
    elems = instance.renderPages();
    expect(elems.length).toBe(5);
    expect(elems[0].key).toBe('3');
    expect(elems[4].key).toBe('7');
  });

  it('renderPaginationInfo method', () => {
    expect(instance.renderPaginationInfo())
      .toBe('Showing 41-50 of 127 results');

    wrapper.setProps({
      currentPage: 1,
      total: 1,
    });
    expect(instance.renderPaginationInfo()).toBe('Showing 1 result');

    wrapper.setProps({
      total: 5,
    });
    expect(instance.renderPaginationInfo()).toBe('Showing all of 5 results');
  });

  it('should call methods inside render function', () => {
    instance.handleChangePage = jest.fn();
    wrapper.setProps({
      currentPage: 5,
      total: 127,
    });
    wrapper.find('.fa-angle-double-left').parent().simulate('click');
    expect(instance.handleChangePage).toHaveBeenCalledWith(1);

    wrapper.find('.fa-angle-left').parent().simulate('click');
    expect(instance.handleChangePage).toHaveBeenCalledWith(4);

    wrapper.find('.fa-angle-right').parent().simulate('click');
    expect(instance.handleChangePage).toHaveBeenCalledWith(6);

    wrapper.find('.fa-angle-double-right').parent().simulate('click');
    expect(instance.handleChangePage).toHaveBeenCalledWith(13);
    expect(instance.handleChangePage).toHaveBeenCalledTimes(4);
  });
});
