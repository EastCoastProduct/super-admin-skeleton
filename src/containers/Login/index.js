import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { loginFetch } from '../../actions/auth';
import { isEmail, isPassword, isRequired } from '../../utils/validator';
import Input from '../../components/Input';

export const validate = (values) => {
  const errors = {};
  const { email, password } = values.toJS();

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

export class LoginComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(values) {
    const { dispatch, router } = this.props;
    return dispatch(loginFetch(values, router));
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.handleLogin)} noValidate>
          <Field
            name="email"
            component={Input}
            label="Email"
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={Input}
            label="Password"
            type="password"
            placeholder="Password"
          />
          {error && <p>{error}</p>}
          <button type="submit" disabled={submitting}>Login</button>
        </form>
      </article>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'Login',
    validate,
  })(LoginComponent)
));
