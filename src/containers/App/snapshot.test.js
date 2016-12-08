import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { superadmin } from '../../fixtures/superadmin';
import { AppComponent } from './';

describe('App component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data', () => {
    const tree = renderer.create(
      <AppComponent
        dispatch={() => {}}
        router={{}}
        superadmin={fromJS(superadmin)}
      >
        <main>Test</main>
      </AppComponent>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
