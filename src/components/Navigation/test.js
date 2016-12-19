import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './';

describe('Navigation component snapshot', () => {
  it('renders', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper).toMatchSnapshot();
  });
});
