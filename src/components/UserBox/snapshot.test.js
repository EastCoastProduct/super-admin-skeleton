import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import UserBox from './';

describe('UserBox component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders basic required data with single child', () => {
    const tree = renderer.create(
      <UserBox header="View Profile">
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders basic required data with array children', () => {
    const tree = renderer.create(
      <UserBox header="View Profile">
        <form>
          <label>Form</label>
        </form>
        <p>Some text</p>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders profile data with sinlge child', () => {
    const profile = fromJS({
      firstname: 'John',
      lastname: 'Doe',
    });
    const tree = renderer.create(
      <UserBox header="View Profile" profile={profile}>
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
