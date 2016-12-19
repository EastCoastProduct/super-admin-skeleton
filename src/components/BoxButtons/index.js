import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { css } from 'aphrodite/no-important';
import Button from '../Button';
import styles from './styles';

function BoxButtons({ children, disabled, link }) {
  return (
    <div>
      <Button
        className={styles.button}
        disabled={disabled}
      >{children}</Button>
      <Link className={css(styles.link)} to={link}>Cancel</Link>
    </div>
  );
}

BoxButtons.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
};

export default BoxButtons;
