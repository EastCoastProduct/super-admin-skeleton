import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const ErrorMsg = ({ children, className, htmlFor }) => {
  const i = <i className={`${css(styles.icon)} fa fa-exclamation-triangle`} />;
  const props = { className: css(styles.error, className && className) };

  return (
    htmlFor ?
      <label {...props} htmlFor={htmlFor}>{i}{children}</label> :
      <p {...props}>{i}{children}</p>
  );
};

ErrorMsg.propTypes = {
  className: PropTypes.object,
  children: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
};

export default ErrorMsg;
