import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const ErrorMsg = ({ children, className }) =>
  <p className={css(styles.error, className && className)}>
    <i className={`${css(styles.icon)} fa fa-exclamation-triangle`} />
    {children}
  </p>;

ErrorMsg.propTypes = {
  className: PropTypes.object,
  children: PropTypes.string.isRequired,
};

export default ErrorMsg;
