import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './';

describe('Page404 component snapshot', () => {
  it('renders page', () => {
    const wrapper = shallow(<Page404 />);

    expect(wrapper).toMatchSnapshot();
  });
});
