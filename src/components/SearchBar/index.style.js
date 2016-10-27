import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors, sizes } = variables;

export default StyleSheet.create({
  bar: {
    background: colors.input,
    borderRadius: sizes.radiusBig,
    boxShadow: `inset 1px 1px ${colors.shadowAlt}`,
    padding: '8px 15px',
  },
  icon: {
    display: 'inline-block',
    fontSize: 24,
    verticalAlign: 'middle',
    width: 24,
  },
  input: {
    border: 0,
    color: colors.font,
    display: 'inline-block',
    outline: 0,
    padding: '0 10px',
    verticalAlign: 'middle',
    width: 'calc(100% - 24px)',
  },
});
