import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { fullProfile, profile } from '../../fixtures/user';
import UserBox, { getHeading } from './';

describe('UserBox component snapshot', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const header = 'Edit Profile';

  it('renders basic required data with single child', () => {
    const tree = renderer.create(
      <UserBox header={header}>
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(getHeading(undefined, header)).toEqual(header);
  });

  it('renders empty profile data with array children', () => {
    const newProfile = fromJS(profile);
    const tree = renderer.create(
      <UserBox header={header} profile={newProfile}>
        <form>
          <label>Form</label>
        </form>
        <p>Some text</p>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(getHeading(newProfile, header)).toEqual(header);
  });

  it('renders profile data with single child', () => {
    const newProfile = fromJS(fullProfile);
    const tree = renderer.create(
      <UserBox header={header} profile={newProfile}>
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(getHeading(newProfile, header)).toEqual(
      `${newProfile.get('firstname')} ${newProfile.get('lastname')}`,
    );
  });

  it('renders profile data with just firstname and single child', () => {
    const newProfile = fromJS(profile).set('firstname', 'John');
    const tree = renderer.create(
      <UserBox header="Edit Profile" profile={newProfile}>
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(getHeading(newProfile, header)).toEqual(newProfile.get('firstname'));
  });

  it('renders profile data with just lastname and single child', () => {
    const newProfile = fromJS(profile).set('lastname', 'Doe');
    const tree = renderer.create(
      <UserBox header="Edit Profile" profile={newProfile}>
        <form>
          <label>Form</label>
        </form>
      </UserBox>
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(getHeading(newProfile, header)).toEqual(newProfile.get('lastname'));
  });
});
