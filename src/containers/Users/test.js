import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { UsersComponent } from './';
import * as Actions from '../../actions/users';

describe('Users component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <UsersComponent
      dispatch={mockDispatch}
      filters={{ confirmed: false, search: '' }}
      router={mockRouter}
      users={fromJS({ error: null, list: [], listTotal: 0, page: 1 })}
    />
  );
  const instance = wrapper.instance();
  Actions.usersGetFetch = jest.fn();
  Actions.paginationChange = jest.fn();

  it('handleGetUsers method', () => {
    const cb = jest.fn();
    instance.handleGetUsers({ page: 1, confirmed: true, search: 'name' }, cb);

    expect(Actions.usersGetFetch).toHaveBeenCalledWith(
      { limit: 10, page: 1, confirmed: true, search: 'name' }, cb
    );
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handleFiltersSubmit method', () => {
    const values = fromJS({
      confirmed: true,
      search: 'name',
    });
    instance.handleGetUsers = jest.fn((filters, cb) => cb());
    instance.handleFiltersSubmit(values);

    expect(instance.handleGetUsers).toHaveBeenCalledWith(
      { page: 1, confirmed: true, search: 'name' }, jasmine.any(Function)
    );
    expect(Actions.paginationChange).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handlePaginationChange method', () => {
    instance.handleGetUsers = jest.fn((filters, cb) => cb());
    instance.handlePaginationChange(5);

    expect(instance.handleGetUsers).toHaveBeenCalledWith(
      { confirmed: false, page: 5, search: '' }, jasmine.any(Function)
    );
    expect(Actions.paginationChange).toHaveBeenCalledWith(5);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handleUserClick method', () => {
    instance.handleUserClick(1);

    expect(mockRouter.push).toHaveBeenCalledWith('/user/1');
  });

  it('clickHandler method', () => {
    instance.handleUserClick = jest.fn();
    const handlerFunction = instance.clickHandler(5);
    handlerFunction();

    expect(instance.handleUserClick).toHaveBeenCalledWith(5);
  });

  it('renderTableBody method', () => {
    wrapper.setProps({
      users: fromJS({
        list: [{
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@mail.com',
          confirmed: true,
        }, {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@mail.com',
          confirmed: true,
        }, {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@mail.com',
          confirmed: true,
        }],
      }),
    });
    const list = instance.renderTableBody();

    expect(list.size).toBe(3);
  });
});
