import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './index.style';

const ErrorMsg = ({ children, style }) =>
  <p className={css(styles.error, style && style)}>
    <i className={`${css(styles.icon)} fa fa-exclamation-triangle`} />
    {children}
  </p>;

ErrorMsg.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default ErrorMsg;
