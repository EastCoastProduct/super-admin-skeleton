import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const UserBox = ({ children, header, profile }) =>
  <main>
    <h1 className={css(styles.header)}>
      <span className={css(styles.headerText)}>Users</span>
      {' > '}
      {(profile && (profile.get('firstname') || profile.get('lastname'))) ?
        `${profile.get('firstname')} ${profile.get('lastname')}` : header}
    </h1>
    <div className={css(styles.box)}>{children}</div>
  </main>;

UserBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  header: PropTypes.string.isRequired,
  profile: PropTypes.object,
};

export default UserBox;
