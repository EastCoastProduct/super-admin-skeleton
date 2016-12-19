import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { fullProfile, profile } from '../../fixtures/user';
import deepMerge from 'deepmerge';
import UserBox, { getHeading } from './';

describe('UserBox component snapshot', () => {
  const props = {
    children: (
      <form key="1">
        <label>Form</label>
      </form>
    ),
    header: 'Edit Profile',
  };

  it('renders basic required data with single child', () => {
    const wrapper = shallow(<UserBox {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(getHeading(undefined, props.header)).toEqual(props.header);
  });

  it('renders empty profile data with array children', () => {
    const newP = deepMerge(props, {
      children: [
        props.children,
        <p key="2">Some text</p>
      ],
      profile: fromJS(profile),
    });
    const wrapper = shallow(<UserBox {...newP} />);

    expect(wrapper).toMatchSnapshot();
    expect(getHeading(newP.profile, newP.header)).toEqual(newP.header);
  });

  it('renders profile data with single child', () => {
    const newP = deepMerge(props, {
      profile: fromJS(fullProfile),
    });
    const wrapper = shallow(<UserBox {...newP} />);

    expect(wrapper).toMatchSnapshot();
    expect(getHeading(newP.profile, newP.header)).toEqual(
      `${newP.profile.get('firstname')} ${newP.profile.get('lastname')}`,
    );
  });

  it('renders profile data with just firstname and single child', () => {
    const newP = deepMerge(props, {
      profile: fromJS(profile).set('firstname', 'John'),
    });
    const wrapper = shallow(<UserBox {...newP} />);

    expect(wrapper).toMatchSnapshot();
    expect(getHeading(newP.profile, newP.header))
      .toEqual(newP.profile.get('firstname'));
  });

  it('renders profile data with just lastname and single child', () => {
    const newP = deepMerge(props, {
      profile: fromJS(profile).set('lastname', 'Doe'),
    });
    const wrapper = shallow(<UserBox {...newP} />);

    expect(wrapper).toMatchSnapshot();
    expect(getHeading(newP.profile, newP.header))
      .toEqual(newP.profile.get('lastname'));
  });
});
