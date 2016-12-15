import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { list, listTotal, page } from '../../fixtures/users';
import { UsersComponent } from './';

jest.mock('redux-form/immutable', () => ({
  Field: 'Field',
  reduxForm: () => component => component,
}));

jest.mock('../../components/UsersFiltersForm', () => 'UsersFiltersForm');

describe('Users component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders empty required data', () => {
    const tree = renderer.create(
      <UsersComponent
        dispatch={() => {}}
        filters={fromJS({ confirmed: false, search: '' })}
        router={{}}
        users={fromJS({
          error: null,
          list: [],
          listTotal: 0,
          page: 1
        })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders full required data', () => {
    const tree = renderer.create(
      <UsersComponent
        dispatch={() => {}}
        filters={fromJS({ confirmed: false, search: '' })}
        router={{}}
        users={fromJS({
          error: null,
          list,
          listTotal,
          page
        })}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
