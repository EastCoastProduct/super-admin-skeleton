import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { css } from 'aphrodite/no-important';
import { userGetFetch } from '../../actions/user';
import UserBox from '../../components/UserBox';
import FileUpload from '../../components/FileUpload';
import styles from './styles';

export class ViewUserComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    profile: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleGetUser();
  }

  handleGetUser() {
    const { dispatch, params: { userId } } = this.props;
    dispatch(userGetFetch(userId));
  }

  render() {
    const { params, profile } = this.props;

    return (
      profile &&
        <UserBox header="View Profile" profile={profile}>
          <dl>
            {profile.get('image') &&
              <FileUpload image={profile.get('image')} preview />
            }
            <dt className={css(styles.term)}>Email</dt>
            <dd className={css(styles.data)}>{profile.get('email')}</dd>
            {profile.get('firstname') &&
              <dt className={css(styles.term)}>First Name</dt>
            }
            {profile.get('firstname') &&
              <dd className={css(styles.data)}>{profile.get('firstname')}</dd>
            }
            {profile.get('lastname') &&
              <dt className={css(styles.term)}>Last Name</dt>
            }
            {profile.get('lastname') &&
              <dd className={css(styles.data)}>{profile.get('lastname')}</dd>
            }
            {profile.get('bio') &&
              <dt className={css(styles.term)}>Bio</dt>
            }
            {profile.get('bio') &&
              <dd className={css(styles.data)}>{profile.get('bio')}</dd>
            }
          </dl>
          <Link
            className={css(styles.link)}
            to={`/user/${params.userId}/edit`}
          >Edit</Link>
        </UserBox>
    );
  }
}

export default connect(state => ({
  profile: state.getIn(['user', 'profile']),
}))(ViewUserComponent);
