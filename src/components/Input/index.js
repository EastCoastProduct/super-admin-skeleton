import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import ErrorMsg from '../ErrorMsg';
import styles from './styles';

const isError = ({ meta: { active, touched, error } }) =>
  !active && touched && error;

const Input = (props) => {
  const { label, input, meta: { error }, textarea, validated, ...rest } = props;
  const attributes = {
    ...input,
    ...rest,
    className: css(textarea ? styles.textarea : styles.input,
      validated && styles.validatedInput, isError(props) && styles.inputErr),
    id: input.name,
  };

  return (
    <div>
      <label className={css(styles.label)} htmlFor={input.name}>
        {label}
      </label>
      {textarea ? <textarea {...attributes} /> : <input {...attributes} />}
      {isError(props) && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
  validated: PropTypes.bool,
};

export default Input;
