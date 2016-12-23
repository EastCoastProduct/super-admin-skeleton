import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheet } from 'aphrodite/no-important';
import SearchBar from './';

describe('SearchBar component snapshot', () => {
  it('renders basic required data', () => {
    const wrapper = shallow(<SearchBar input={{}} meta={{}} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with additional style, value and extra attributes', () => {
    const styles = StyleSheet.create({
      additional: {
        margin: 10,
        padding: 10,
      },
    });
    const wrapper = shallow(
      <SearchBar
        className={styles.additional}
        input={{ value: 'name' }}
        meta={{}}
        placeholder="This is Search Box"
        type="text"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
