import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import styles from './index.style';

const Header = ({ handleLogout, superadmin }) =>
  <header className={css(styles.header)}>
    <p>Hello,&nbsp;
      <b>{superadmin.get('firstname')} {superadmin.get('lastname')}</b>
    </p>
    <a
      className={css(styles.link)}
      href
      onClick={handleLogout}
    >Logout</a>
  </header>;

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  superadmin: PropTypes.object.isRequired,
};

export default Header;
