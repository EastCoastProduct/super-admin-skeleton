import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const Button = ({ className, children, empty, ...rest }) =>
  <button
    className={css(empty ? styles.empty : styles.button,
      className && className)}
    {...rest}
  >{children}</button>;

Button.propTypes = {
  className: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  empty: PropTypes.bool,
};

export default Button;
