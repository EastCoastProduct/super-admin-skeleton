import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile, profile } from '../../fixtures/user';
import { ViewUserComponent } from './';

describe('Users component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders empty required data', () => {
    const tree = renderer.create(
      <ViewUserComponent
        dispatch={() => {}}
        params={{ userId: profile.id }}
        profile={fromJS(profile)}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders full required data', () => {
    const tree = renderer.create(
      <ViewUserComponent
        dispatch={() => {}}
        params={{ userId: fullProfile.id }}
        profile={fromJS(fullProfile)}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
