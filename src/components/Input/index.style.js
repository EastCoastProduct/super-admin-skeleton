import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';

const { colors, sizes } = variables;

export default StyleSheet.create({
  input: {
    background: colors.input,
    border: `1px solid ${colors.header}`,
    borderRadius: sizes.radius,
    boxShadow: `inset 1px 1px ${colors.shadow}`,
    color: colors.font,
    height: sizes.inputHeight,
    padding: '5px 10px',
    width: '100%',
  },
  label: {
    color: colors.header,
    display: 'inline-block',
    fontWeight: 700,
    lineHeight: `${sizes.inputHeight}px`,
    marginRight: 20,
    textTransform: 'uppercase',
    verticalAlign: 'top',
  },
  holder: {
    display: 'inline-block',
    marginBottom: 50,
    verticalAlign: 'top',
    width: '78%',
  },
  holderErr: {
    marginBottom: 0,
  },
});
