import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes, zIndex } from '../../styles/variables';

const shared = {
  navLink: {
    display: 'block',
    lineHeight: '80px',
    padding: '0 25px',
    textDecoration: 'none',
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
    zIndex: zIndex.navigation,
  },
  navLink: {
    ...shared.navLink,
    color: colors.header,
  },
  navLinkActive: {
    ...shared.navLink,
    backgroundColor: colors.header,
    color: colors.contentBcg,
  },
  navIcon: {
    fontSize: 20,
    marginRight: 10,
    width: 20,
  },
});
