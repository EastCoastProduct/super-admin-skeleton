import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import ErrorMsg from '../ErrorMsg';
import styles from './styles';

export const isError = ({ active, touched, error }) =>
  !active && touched && error;

const Input = (props) => {
  const { id, input, label, meta, meta: { error }, textarea, validate: _,
    validated, ...rest } = props;
  const attributes = {
    ...input,
    ...rest,
    className: css(textarea ? styles.textarea : styles.input,
      validated && styles.validatedInput, isError(meta) && styles.inputErr),
    id: `${id}-${input.name}`,
  };

  return (
    <p>
      <label className={css(styles.label)} htmlFor={`${id}-${input.name}`}>
        {label}
      </label>
      {textarea ? <textarea {...attributes} /> : <input {...attributes} />}
      {isError(meta) &&
        <ErrorMsg htmlFor={`${id}-${input.name}`}>{error}</ErrorMsg>
      }
    </p>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  validated: PropTypes.bool,
};

export default Input;
