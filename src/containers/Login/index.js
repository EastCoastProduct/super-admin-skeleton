import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import store from 'store';
import { loginFetch } from '../../actions/auth';
import { isEmail, isPassword, isRequired } from '../../utils/validator';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import Button from '../../components/Button';
import styles from './styles';

export class LoginComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
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
    const nextRoute = store.get('nextRoute') || '/';
    if (nextRoute !== '/') store.remove('nextRoute');
    return dispatch(loginFetch(values)).then(() => router.push(nextRoute));
  }

  render() {
    const { error, form, handleSubmit, submitting } = this.props;

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
          <form onSubmit={handleSubmit(this.handleLogin)} noValidate>
            <Field
              name="email"
              component={Input}
              id={form}
              label="Email"
              type="email"
              placeholder="Email"
              validate={[isRequired, isEmail]}
              validated
            />
            <Field
              name="password"
              component={Input}
              id={form}
              label="Password"
              type="password"
              placeholder="Password"
              validate={[isRequired, isPassword]}
              validated
            />
            <Button
              className={styles.button}
              type="submit"
              disabled={submitting}
            >Login</Button>
            {error && <ErrorMsg className={styles.error}>{error}</ErrorMsg>}
          </form>
        </section>
      </main>
    );
  }
}

export default connect()(withRouter(
  reduxForm({
    form: 'Login',
  })(LoginComponent),
));
