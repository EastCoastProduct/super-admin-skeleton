import { StyleSheet } from 'aphrodite/no-important';
import { button } from '../../styles/mixins';

export default StyleSheet.create({
  button: {
    ...button,
  },
  empty: {
    background: 0,
    border: 0,
    color: 'inherit',
    outline: 'none',
    padding: 0,
  },
});
