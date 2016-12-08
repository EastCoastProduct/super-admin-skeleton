import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile, profile } from '../../fixtures/user';
import { EditUserComponent } from './';

jest.mock('redux-form/immutable', () => ({
  Field: 'Field',
  reduxForm: () => component => component,
}));

describe('EditUser component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders required data', () => {
    const tree = renderer.create(
      <EditUserComponent
        dispatch={() => {}}
        form="EditUser"
        handleSubmit={f => f => f}
        params={{ userId: 1 }}
        profile={fromJS(profile)}
        router={{}}
        submitting={true}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders required data with error', () => {
    const tree = renderer.create(
      <EditUserComponent
        dispatch={() => {}}
        error="User not found."
        form="EditUser"
        handleSubmit={f => f => f}
        params={{ userId: 999 }}
        profile={fromJS(fullProfile)}
        router={{}}
        submitting={false}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
