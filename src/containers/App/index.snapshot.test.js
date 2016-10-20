import React from 'react';
import renderer from 'react-test-renderer';
import { AppComponent } from './';

describe('App component snapshot', () => {
  it('renders', () => {
    const children = <div>Test</div>;
    const tree = renderer.create(
      <AppComponent
        dispatch={() => {}}
        router={{}}
      >{children}</AppComponent>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
