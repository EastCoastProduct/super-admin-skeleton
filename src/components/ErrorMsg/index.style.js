import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors } = variables;

export default StyleSheet.create({
  error: {
    backgroundColor: colors.errorBcg,
    color: colors.error,
    lineHeight: '30px',
    margin: '5px 0 15px',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
