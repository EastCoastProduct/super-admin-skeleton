import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import deepMerge from 'deepmerge';
import { list, listTotal, page } from '../../fixtures/users';
import { UsersComponent } from './';
import * as Actions from '../../actions/users';

describe('Users component', () => {
  const props = {
    dispatch: jest.fn(),
    filters: fromJS({ confirmed: false, search: '' }),
    router: {
      push: jest.fn(),
    },
    users: fromJS({
      error: null,
      list,
      listTotal,
      page,
    })
  };
  const wrapper = shallow(<UsersComponent {...props} />);

  describe('snapshot', () => {
    it('renders empty required data', () => {
      const newProps = {
        ...props,
        users: fromJS({
          error: null,
          list: [],
          listTotal: 0,
          page: 1,
        })
      };
      const newWrapper = shallow(<UsersComponent {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });

    it('renders full required data', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    Actions.usersGetFetch = jest.fn();
    Actions.paginationChange = jest.fn();
    const instance = wrapper.instance();

    it('composeParams static method with acceptable params', () => {
      const params = {
        confirmed: true,
        search: 'name',
      };
      const newParams = instance.constructor.composeParams(1, fromJS(params));
      expect(newParams).toEqual({
        page: 1,
        confirmed: true,
        search: 'name',
      });
    });

    it('composeParams static method without acceptable params', () => {
      const params = {
        confirmed: false,
        search: '',
      };
      const newParams = instance.constructor.composeParams(5, fromJS(params));
      expect(newParams).toEqual({
        page: 5,
      });
    });

    it('handleGetUsers method', () => {
      instance.handleGetUsers({ page: 1, confirmed: true, search: 'name' });

      expect(Actions.usersGetFetch).toHaveBeenCalledWith({
        limit: 10,
        page: 1,
        confirmed: true,
        search: 'name'
      });
      expect(instance.props.dispatch).toHaveBeenCalled();
    });

    it('handleFiltersSubmit method', () => {
      const values = fromJS({
        confirmed: true,
        search: 'name',
      });
      spyOn(instance, 'handleGetUsers').and.callFake(() => Promise.resolve());
      const p = instance.handleFiltersSubmit(values);

      expect(instance.handleGetUsers).toHaveBeenCalledWith({
        page: 1,
        confirmed: true,
        search: 'name'
      });
      return p.then(() => {
        expect(Actions.paginationChange).toHaveBeenCalledWith(1);
        expect(instance.props.dispatch).toHaveBeenCalled();
      });
    });

    it('handlePaginationChange method', () => {
      spyOn(instance, 'handleGetUsers').and.callFake(() => Promise.resolve());
      const p = instance.handlePaginationChange(5);

      expect(instance.handleGetUsers).toHaveBeenCalledWith({ page: 5 });
      return p.then(() => {
        expect(Actions.paginationChange).toHaveBeenCalledWith(5);
        expect(instance.props.dispatch).toHaveBeenCalled();
      });
    });

    it('handleUserClick method', () => {
      instance.handleUserClick(1);

      expect(instance.props.router.push).toHaveBeenCalledWith('/user/1');
    });

    it('clickHandler method', () => {
      spyOn(instance, 'handleUserClick');
      const handlerFunction = instance.clickHandler(5);
      handlerFunction();

      expect(instance.handleUserClick).toHaveBeenCalledWith(5);
    });

    it('renderTableBody method', () => {
      spyOn(instance, 'handleUserClick');
      const table = instance.renderTableBody();
      wrapper.find('tr[onClick]').first().simulate('click');

      expect(table.size).toBe(10);
      expect(instance.handleUserClick).toHaveBeenCalledWith(list[0].id);
    });
  });
});
