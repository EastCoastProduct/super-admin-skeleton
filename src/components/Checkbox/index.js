import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

function Checkbox(props) {
  const { className, id, label, input, meta: _, onChange, ...rest } = props;

  return (
    <label
      className={css(className && className)}
      htmlFor={`${id}-${input.name}`}
    >
      <span className={css(styles.checkbox, input.value && styles.checked)}>
        {input.value && <i className="fa fa-check" />}
      </span>
      <input
        className={css(styles.base)}
        {...input}
        {...rest}
        id={`${id}-${input.name}`}
        type="checkbox"
        onChange={(e) => {
          input.onChange(e);
          if (onChange) setTimeout(() => onChange());
        }}
      />
      {label}
    </label>
  );
}

Checkbox.propTypes = {
  className: PropTypes.object,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default Checkbox;
