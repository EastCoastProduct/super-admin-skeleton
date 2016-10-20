import React, { PropTypes } from 'react';

const Input = (props) => {
  const { label, input, meta: { active, touched, error }, ...other } = props;

  return (
    <div>
      <label htmlFor={input.name}>
        {label}
        <input id={input.name} {...input} {...other} />
      </label>
      {!active && touched && error && <p>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Input;
