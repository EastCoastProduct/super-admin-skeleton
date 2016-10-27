import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './index.style';

const Button = ({ children, empty, style, ...other }) =>
  <button
    className={css(empty ? styles.empty : styles.button, style && style)}
    {...other}
  >{children}</button>;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  empty: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;
