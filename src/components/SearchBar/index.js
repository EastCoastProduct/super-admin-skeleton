import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import Button from '../Button';
import styles from './styles';

function SearchBar({ className, input, meta: _, ...rest }) {
  return (
    <p className={css(styles.bar, className && className)} >
      <Button empty>
        <i className={`${css(styles.icon)} fa fa-search`} />
      </Button>
      <input {...input} {...rest} className={css(styles.input)} type="search" />
    </p>
  );
}

SearchBar.propTypes = {
  className: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default SearchBar;
