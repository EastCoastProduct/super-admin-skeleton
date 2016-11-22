import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import ErrorMsg from '../ErrorMsg';
import styles from './styles';

const isError = ({ meta: { active, touched, error } }) =>
  !active && touched && error;

const Input = (props) => {
  const { id, input, label, meta: { error }, textarea, validated, ...rest } =
    props;
  const attributes = {
    ...input,
    ...rest,
    className: css(textarea ? styles.textarea : styles.input),
    id: `${id}-${input.name}`,
  };

  return (
    <div
      className={css(styles.holder, validated && styles.validatedHolder,
        isError(props) && styles.errHolder)}
    >
      <label className={css(styles.label)} htmlFor={`${id}-${input.name}`}>
        {label}
      </label>
      {textarea ? <textarea {...attributes} /> : <input {...attributes} />}
      {isError(props) && <ErrorMsg className={styles.error}>{error}</ErrorMsg>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  textarea: PropTypes.bool,
  validated: PropTypes.bool,
};

export default Input;
