import React from 'react';
import { mount, shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import Button from '../Button';
import Pagination from './';

describe('Pagination component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    jest.resetAllMocks();
    wrapper.setProps(props);
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const props = {
    currentPage: 1,
    handlePaginationChange: jest.fn(),
    itemsPerPage: 10,
    total: 127,
  };
  const wrapper = shallow(
    <Pagination {...props} />
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
    expect(instance.props.handlePaginationChange).toHaveBeenCalledWith(5);
  });

  it('should call handleChangePage internally through click events', () => {
    wrapper.setProps({
      currentPage: 7,
    });
    const btn = wrapper.find(Button);

    btn.first().simulate('click');
    expect(instance.props.handlePaginationChange).toHaveBeenCalledWith(1);

    btn.at(1).simulate('click');
    expect(instance.props.handlePaginationChange).toHaveBeenLastCalledWith(6);

    btn.at(2).simulate('click');
    expect(instance.props.handlePaginationChange).toHaveBeenLastCalledWith(5);

    btn.at(6).simulate('click');
    expect(instance.props.handlePaginationChange).toHaveBeenLastCalledWith(8);

    btn.last().simulate('click');
    expect(instance.props.handlePaginationChange).toHaveBeenLastCalledWith(13);
  });

  it('clickHandler method', () => {
    spyOn(instance, 'handleChangePage');
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
    expect(mount(elems[0]).text()).toBe('1');
    expect(mount(elems[4]).find('button').text()).toBe('5');

    wrapper.setProps({
      currentPage: 5,
    });
    instance.numOfPages = 13;
    elems = instance.renderPages();
    expect(elems.length).toBe(5);
    expect(mount(elems[0]).find('button').text()).toBe('3');
    expect(mount(elems[4]).find('button').text()).toBe('7');
  });

  it('renderPaginationInfo method', () => {
    expect(instance.renderPaginationInfo())
      .toBe('Showing 1-10 of 127 results');

    wrapper.setProps({
      currentPage: 5,
      total: 99
    });

    expect(instance.renderPaginationInfo())
      .toBe('Showing 41-50 of 99 results');

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
    spyOn(instance, 'handleChangePage');
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
