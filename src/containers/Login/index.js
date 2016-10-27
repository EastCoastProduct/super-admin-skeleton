import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import { loginFetch } from '../../actions/auth';
import { isEmail, isPassword, isRequired } from '../../utils/validator';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';
import styles from './index.style';

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
      <main className={css(styles.page)}>
        <section className={css(styles.box, error && styles.boxErr)}>
          <img
            className={css(styles.logo)}
            src={'http://wp.streetwise.co/wp-content/uploads//2015/10//' +
              'fullECPlogo_Black4.png'}
            alt="Company Logo"
          />
          <h1 className={css(styles.header)}>Login to your account</h1>
          <form
            className={css(styles.form)}
            onSubmit={handleSubmit(this.handleLogin)}
            noValidate
          >
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
            <Button
              style={styles.button}
              type="submit"
              disabled={submitting}
            >Login</Button>
            {error && <ErrorMsg style={styles.error}>{error}</ErrorMsg>}
          </form>
        </section>
      </main>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'Login',
    validate,
  })(LoginComponent)
));
