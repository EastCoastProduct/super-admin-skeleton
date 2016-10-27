import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors, sizes, transition } = variables;

export default StyleSheet.create({
  button: {
    backgroundColor: colors.input,
    border: `2px solid ${colors.borderAlt}`,
    boxShadow: `1px 1px ${colors.shadow}`,
    borderRadius: sizes.radius,
    color: colors.font,
    fontWeight: 700,
    outline: 'none',
    padding: 10,
    textTransform: 'uppercase',
    transition: transition.base,
    width: '100%',
    ':hover': {
      backgroundColor: colors.background,
    },
    ':active': {
      backgroundColor: colors.header,
      boxShadow: 'none',
    },
    ':disabled': {
      backgroundColor: colors.background,
      border: 0,
      boxShadow: 'none',
      color: colors.shadow,
    },
  },
  empty: {
    background: 0,
    border: 0,
    color: 'inherit',
    padding: 0,
  },
});
