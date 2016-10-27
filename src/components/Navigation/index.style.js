import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors, sizes } = variables;

const mixin = {
  navLink: {
    display: 'block',
    fontWeight: 700,
    lineHeight: '80px',
    padding: '0 25px',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
};

export default StyleSheet.create({
  aside: {
    backgroundColor: colors.contentBcg,
    height: `calc(100vh - ${sizes.header}px)`,
    left: 0,
    overflow: 'auto',
    padding: '90px 0 20px',
    position: 'fixed',
    top: sizes.header,
    width: sizes.navigation,
  },
  navLink: {
    ...mixin.navLink,
    color: colors.header,
  },
  navLinkActive: {
    ...mixin.navLink,
    backgroundColor: colors.header,
    color: colors.contentBcg,
  },
  navIcon: {
    fontSize: 20,
    marginRight: 10,
    width: 20,
  },
});
