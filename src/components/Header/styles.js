import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes, zIndex } from '../../styles/variables';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.header,
    color: colors.contentBcg,
    display: 'flex',
    height: sizes.header,
    justifyContent: 'flex-end',
    left: 0,
    padding: '0 50px',
    position: 'fixed',
    textTransform: 'uppercase',
    top: 0,
    width: '100%',
    zIndex: zIndex.header,
  },
  link: {
    marginLeft: 20,
  },
});
