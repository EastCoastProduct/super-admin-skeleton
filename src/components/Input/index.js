import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import ErrorMsg from '../ErrorMsg';
import styles from './index.style';

const isError = ({ meta: { active, touched, error } }) =>
  !active && touched && error;

const Input = (props) => {
  const { label, input, meta: { error }, ...other } = props;

  return (
    <div>
      <label className={css(styles.label)} htmlFor={input.name}>
        {label}
      </label>
      <div className={css(styles.holder, isError(props) && styles.holderErr)}>
        <input
          className={css(styles.input)}
          id={input.name}
          {...input}
          {...other}
        />
        {isError(props) && <ErrorMsg>{error}</ErrorMsg>}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Input;
