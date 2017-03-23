import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import styles from './styles';

const mapLinks = (links, router) =>
  links.map(link => (
    <li>
      <Link
        to={link.to}
        key={link.to}
        className={
          css(router.isActive(link.to) ? styles.navLinkActive : styles.navLink)
        }
        activeClassName={css(styles.navLinkActive)}
      >
        <i className={`${css(styles.navIcon)} fa fa-${link.icon}`} />
        {link.label}
      </Link>
    </li>
  ));

const navLinks = [
  {
    to: '/users',
    label: 'Users',
    icon: 'user',
  },
  {
    to: '/placeholder',
    label: 'Placeholder',
    icon: 'asterisk',
  },
  {
    to: '/placeholder2',
    label: 'Placeholder',
    icon: 'asterisk',
  },
];

const Navigation = props =>
  <aside className={css(styles.aside)}>
    <nav>
      <ul>
        {mapLinks(navLinks, props.router)}
      </ul>
    </nav>
  </aside>;

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Navigation);
