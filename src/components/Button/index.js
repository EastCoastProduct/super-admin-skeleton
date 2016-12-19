import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

function Button({ className, children, empty, ...rest }) {
  return (
    <button
      className={css(empty ? styles.empty : styles.button,
        className && className)}
      type="submit"
      {...rest}
    >{children}</button>
  );
}

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
