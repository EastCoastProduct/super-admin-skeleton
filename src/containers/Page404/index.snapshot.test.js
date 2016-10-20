import React from 'react';
import renderer from 'react-test-renderer';
import Page404 from './';

describe('Page404 component snapshot', () => {
  it('renders page', () => {
    const tree = renderer.create(
      <Page404 />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
