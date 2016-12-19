import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { userGetFetch, userUpdateFetch } from '../../actions/user';
import { isFileSizeExceeded } from '../../utils/validator';
import UserBox from '../../components/UserBox';
import FileUpload from '../../components/FileUpload';
import Input from '../../components/Input';
import ErrorMsg from '../../components/ErrorMsg';
import BoxButtons from '../../components/BoxButtons';

export class EditUserComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    profile: PropTypes.object,
    router: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);

    this.handleGetUser();
  }

  handleGetUser() {
    const { dispatch, params: { userId } } = this.props;
    dispatch(userGetFetch(userId));
  }

  handleUserUpdate(values) {
    const { dispatch, params: { userId }, router } = this.props;
    return dispatch(userUpdateFetch(values, userId)).then(() =>
      router.push(`/user/${userId}`),
    );
  }

  render() {
    const { error, form, handleSubmit, params, profile, submitting } =
      this.props;

    return (
      profile &&
        <UserBox header="Edit Profile" profile={profile}>
          <form onSubmit={handleSubmit(this.handleUserUpdate)} noValidate>
            <Field
              name="image"
              component={FileUpload}
              id={form}
              image={profile.get('image')}
              validate={isFileSizeExceeded}
              validated
            />
            <Field
              name="firstname"
              component={Input}
              id={form}
              label="First Name"
              placeholder="First Name"
              maxLength="30"
            />
            <Field
              name="lastname"
              component={Input}
              id={form}
              label="Last Name"
              placeholder="Last Name"
              maxLength="30"
            />
            <Field
              name="bio"
              component={Input}
              id={form}
              label="Bio"
              placeholder="Bio"
              maxLength="1000"
              textarea
            />
            <BoxButtons
              disabled={submitting}
              link={`/user/${params.userId}`}
            >Save</BoxButtons>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </form>
        </UserBox>
    );
  }
}

export default connect(state => ({
  initialValues: {
    bio: state.getIn(['user', 'profile', 'bio']) || '',
    firstname: state.getIn(['user', 'profile', 'firstname']) || '',
    lastname: state.getIn(['user', 'profile', 'lastname']) || '',
  },
  profile: state.getIn(['user', 'profile']),
}))(withRouter(reduxForm({
  enableReinitialize: true,
  form: 'EditUser',
})(EditUserComponent)));
