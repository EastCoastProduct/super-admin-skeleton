import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes } from '../../styles/variables';

export default StyleSheet.create({
  page: {
    display: 'flex',
    minHeight: '100vh',
    padding: 20,
  },
  box: {
    alignSelf: 'center',
    backgroundColor: colors.contentBcg,
    borderRadius: sizes.radius,
    boxShadow: `0 1px ${colors.shadow}`,
    margin: '0 auto',
    padding: '53px 33px 72px',
    textAlign: 'center',
    width: sizes.contentBox,
  },
  boxErr: {
    paddingBottom: 32,
  },
  logo: {
    maxHeight: '153px',
    maxWidth: '153px',
  },
  header: {
    margin: '25px 0 76px',
  },
  error: {
    margin: '10px 0 0',
  },
  button: {
    width: '39%',
  },
});
