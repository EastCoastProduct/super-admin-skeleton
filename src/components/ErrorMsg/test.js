import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet } from 'aphrodite/no-important';
import ErrorMsg from './';

describe('ErrorMsg component snapshot', () => {
  it('renders basic required data without htmlFor', () => {
    const wrapper = shallow(<ErrorMsg>Something went wrong.</ErrorMsg>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders basic required data with htmlFor', () => {
    const wrapper = shallow(
      <ErrorMsg htmlFor="Login-email">Something went wrong.</ErrorMsg>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with additional styles', () => {
    const styles = StyleSheet.create({
      additional: {
        margin: 0,
        padding: 0,
      },
    });
    const wrapper = shallow(
      <ErrorMsg className={styles.additional}>Something went wrong.</ErrorMsg>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
