import React from 'react';
import { shallow } from 'enzyme';
import BoxButtons from './';

describe('BoxButtons component snapshot', () => {
  it('renders basic required data', () => {
    const wrapper = shallow(
      <BoxButtons disabled={false} link="/users">Create</BoxButtons>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled and different link', () => {
    const wrapper = shallow(
      <BoxButtons disabled link="/user/1">Save</BoxButtons>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
