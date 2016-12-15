import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import Button from '../Button';
import styles from './styles';

const SearchBar = ({ className, input, meta: _, ...rest }) =>
  <p className={css(styles.bar, className && className)} >
    <Button type="submit" empty>
      <i className={`${css(styles.icon)} fa fa-search`} />
    </Button>
    <input className={css(styles.input)} {...input} {...rest} />
  </p>;

SearchBar.propTypes = {
  className: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default SearchBar;
