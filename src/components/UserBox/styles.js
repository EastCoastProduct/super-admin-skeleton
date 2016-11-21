import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes } from '../../styles/variables';

export default StyleSheet.create({
  header: {
    color: colors.header,
  },
  headerText: {
    textDecoration: 'underline',
  },
  box: {
    backgroundColor: colors.contentBcg,
    borderRadius: 3,
    boxShadow: `0 1px ${colors.shadow}`,
    marginTop: 20,
    minWidth: sizes.contentBox,
    padding: 40,
    width: '50%',
  },
});
