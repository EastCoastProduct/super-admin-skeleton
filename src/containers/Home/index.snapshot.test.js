import React from 'react';
import renderer from 'react-test-renderer';
import Home from './';

describe('Home component snapshot', () => {
  it('renders page', () => {
    const tree = renderer.create(
      <Home />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
