import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes } from '../../styles/variables';

export default StyleSheet.create({
  holder: {
    display: 'block',
    marginBottom: 20,
  },
  base: {
    display: 'none',
  },
  checkbox: {
    backgroundColor: colors.header,
    borderRadius: sizes.radius,
    color: colors.input,
    cursor: 'pointer',
    display: 'inline-block',
    height: 25,
    marginRight: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 25,
  },
  checked: {
    fontSize: 25,
  },
});
