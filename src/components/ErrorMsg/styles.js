import { StyleSheet } from 'aphrodite/no-important';
import { colors } from '../../styles/variables';

export default StyleSheet.create({
  error: {
    backgroundColor: colors.errorBcg,
    color: colors.error,
    margin: '10px 0',
    padding: '6.5px 10px',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
