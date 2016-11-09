import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const Checkbox = ({ className, label, input, meta: _, onChange, ...rest }) =>
  <label
    className={css(className && className)}
    htmlFor={input.name}
  >
    <span className={css(styles.checkbox, input.value && styles.checked)}>
      {input.value && <i className="fa fa-check" />}
    </span>
    <input
      className={css(styles.base)}
      {...input}
      {...rest}
      id={input.name}
      type="checkbox"
      onChange={(e) => {
        input.onChange(e);
        if (onChange) setTimeout(() => onChange());
      }}
    />
    {label}
  </label>;

Checkbox.propTypes = {
  className: PropTypes.object,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default Checkbox;
