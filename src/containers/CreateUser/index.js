import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { userCreateFetch } from '../../actions/user';
import { isEmail, isRequired } from '../../utils/validator';
import UserBox from '../../components/UserBox';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import BoxButtons from '../../components/BoxButtons';

export const validate = (values) => {
  const errors = {};
  const email = values.get('email');

  errors.email = isRequired(email) || isEmail(email);
  return errors;
};

export class CreateUserComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUserCreate = this.handleUserCreate.bind(this);
  }

  handleUserCreate(values) {
    const { dispatch, router } = this.props;
    return dispatch(userCreateFetch(values, id =>
      router.push(`/user/${id}`),
    ));
  }

  render() {
    const { error, form, handleSubmit, submitting } = this.props;

    return (
      <UserBox header="Create New User">
        <form onSubmit={handleSubmit(this.handleUserCreate)} noValidate>
          <Field
            name="email"
            component={Input}
            id={form}
            label="Email"
            type="email"
            placeholder="Email"
            validated
          />
          <BoxButtons disabled={submitting} link="/">Create</BoxButtons>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </form>
      </UserBox>
    );
  }
}

export default connect()(withRouter(reduxForm({
  form: 'CreateUser',
  validate,
})(CreateUserComponent)));
