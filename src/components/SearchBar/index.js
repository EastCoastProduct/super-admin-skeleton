import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './index.style';

const SearchBar = ({ style }) =>
  <div className={css(styles.bar, style && style)}>
    <i className={`${css(styles.icon)} fa fa-search`} />
    <input className={css(styles.input)} />
  </div>;

SearchBar.propTypes = {
  style: PropTypes.object.isRequired,
};

export default SearchBar;
