import React from 'react';
import { IndexLink, Link } from 'react-router';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const Navigation = () =>
  <aside className={css(styles.aside)}>
    <nav>
      <ul>
        <li>
          <IndexLink
            className={css(styles.navLink)}
            activeClassName={css(styles.navLinkActive)}
            to="/"
          >
            <i className={`${css(styles.navIcon)} fa fa-user`} />
            Users
          </IndexLink>
        </li>
        <li>
          <Link
            className={css(styles.navLink)}
            activeClassName={css(styles.navLinkActive)}
          >
            <i className={`${css(styles.navIcon)} fa fa-address-book`} />
            Placeholder
          </Link>
        </li>
        <li>
          <Link
            className={css(styles.navLink)}
            activeClassName={css(styles.navLinkActive)}
          >
            <i className={`${css(styles.navIcon)} fa fa-lock`} />
            Placeholder
          </Link>
        </li>
      </ul>
    </nav>
  </aside>;

export default Navigation;
