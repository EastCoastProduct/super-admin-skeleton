import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet } from 'aphrodite/no-important';
import Button from './';

describe('Button component snapshot', () => {
  it('renders basic required data', () => {
    const wrapper = shallow(<Button>Login</Button>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders empty button', () => {
    const wrapper = shallow(<Button empty>Login</Button>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with additional styles and attributes', () => {
    const styles = StyleSheet.create({
      additional: {
        margin: 0,
        padding: 0,
      },
    });
    const wrapper = shallow(
      <Button className={styles.additional} disabled type="button">
        Delete
      </Button>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
