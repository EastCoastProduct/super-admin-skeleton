import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { sizes } = variables;

export default StyleSheet.create({
  content: {
    padding: `${sizes.header + 40}px 40px 40px ${sizes.navigation + 40}px`,
  },
});
