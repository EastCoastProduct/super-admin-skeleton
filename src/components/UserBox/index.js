import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

export const getHeading = (profile, header) => {
  if (!profile) return header;
  const firstname = profile.get('firstname') || '';
  const lastname = profile.get('lastname') || '';
  if (!firstname && !lastname) return header;
  return `${firstname}${firstname && lastname && ' '}${lastname}`;
};

const UserBox = ({ children, header, profile }) =>
  <main>
    <h1 className={css(styles.header)}>
      <span className={css(styles.headerText)}>Users</span>
      {' > '}
      {getHeading(profile, header)}
    </h1>
    <section className={css(styles.box)}>{children}</section>
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
