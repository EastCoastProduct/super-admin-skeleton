import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors, sizes } = variables;

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
  },
  link: {
    color: 'inherit',
    marginLeft: 20,
  },
});
