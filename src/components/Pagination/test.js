import React from 'react';
import { mount, shallow } from 'enzyme';
import { StyleSheet } from 'aphrodite/no-important';
import deepMerge from 'deepmerge';
import Pagination from './';

describe('Pagination component', () => {
  const props = {
    currentPage: 1,
    handlePaginationChange: jest.fn(),
    itemsPerPage: 10,
    total: 127,
  };
  const wrapper = shallow(<Pagination {...props} />);

  describe('snapshot', () => {
    it('renders required data with current page 1', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders required data with current page 5', () => {
      const newProps = deepMerge(props, {
        currentPage: 5,
        total: 93,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders required data with current page being last', () => {
      const newProps = deepMerge(props, {
        currentPage: 8,
        total: 78,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders required data with less than 5 pages', () => {
      const newProps = deepMerge(props, {
        currentPage: 2,
        total: 30,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders just message with extra style for low number of items', () => {
      const styles = StyleSheet.create({
        additional: {
          margin: 10,
          padding: 10,
        },
      });
      const newProps = deepMerge(props, {
        className: styles.additional,
        total: 5,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders just message for 1 item', () => {
      const newProps = deepMerge(props, {
        total: 1,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('doesn\'t render anything for 0 items', () => {
      const newProps = deepMerge(props, {
        total: 0,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      // resets this.numOfPages back to default for each test
      instance.numOfPages = Math.ceil(props.total / props.itemsPerPage);
    });
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
      const newProps = deepMerge(props, {
        currentPage: 7,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);
      const newInstance = newWrapper.instance();
      const btn = newWrapper.find('Button');

      btn.first().simulate('click');
      expect(newInstance.props.handlePaginationChange).toHaveBeenCalledWith(1);

      btn.at(1).simulate('click');
      expect(newInstance.props.handlePaginationChange)
        .toHaveBeenLastCalledWith(6);

      btn.at(2).simulate('click');
      expect(newInstance.props.handlePaginationChange)
        .toHaveBeenLastCalledWith(5);

      btn.at(6).simulate('click');
      expect(newInstance.props.handlePaginationChange)
        .toHaveBeenLastCalledWith(8);

      btn.last().simulate('click');
      expect(newInstance.props.handlePaginationChange)
        .toHaveBeenLastCalledWith(13);
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

      const newProps = deepMerge(props, {
        currentPage: 5,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);
      const newInstance = newWrapper.instance();
      newInstance.numOfPages = 13;
      elems = newInstance.renderPages();
      expect(elems.length).toBe(5);
      expect(mount(elems[0]).find('button').text()).toBe('3');
      expect(mount(elems[4]).find('button').text()).toBe('7');
    });

    it('renderPaginationInfo method', () => {
      expect(instance.renderPaginationInfo())
        .toBe('Showing 1-10 of 127 results');

      const newProps = deepMerge(props, {
        currentPage: 5,
        total: 99,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);
      const newInstance = newWrapper.instance();

      expect(newInstance.renderPaginationInfo())
        .toBe('Showing 41-50 of 99 results');

      newWrapper.setProps({
        currentPage: 1,
        total: 1,
      });
      expect(newInstance.renderPaginationInfo()).toBe('Showing 1 result');

      newWrapper.setProps({
        total: 5,
      });
      expect(newInstance.renderPaginationInfo())
        .toBe('Showing all of 5 results');
    });

    it('should call methods inside render function', () => {
      const newProps = deepMerge(props, {
        currentPage: 5,
      });
      const newWrapper = shallow(<Pagination {...newProps} />);
      const newInstance = newWrapper.instance();
      spyOn(newInstance, 'handleChangePage');

      newWrapper.find('.fa-angle-double-left').parent().simulate('click');
      expect(newInstance.handleChangePage).toHaveBeenCalledWith(1);

      newWrapper.find('.fa-angle-left').parent().simulate('click');
      expect(newInstance.handleChangePage).toHaveBeenCalledWith(4);

      newWrapper.find('.fa-angle-right').parent().simulate('click');
      expect(newInstance.handleChangePage).toHaveBeenCalledWith(6);

      newWrapper.find('.fa-angle-double-right').parent().simulate('click');
      expect(newInstance.handleChangePage).toHaveBeenCalledWith(13);
      expect(newInstance.handleChangePage).toHaveBeenCalledTimes(4);
    });
  });
});
