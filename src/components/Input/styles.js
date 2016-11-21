import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes } from '../../styles/variables';

const shared = {
  input: {
    background: colors.input,
    border: `1px solid ${colors.header}`,
    borderRadius: sizes.radius,
    boxShadow: `inset 1px 1px ${colors.shadow}`,
    color: colors.font,
    marginBottom: 20,
    padding: '9px 10px',
    width: '100%',
  },
};

export default StyleSheet.create({
  input: {
    ...shared.input,
    height: sizes.inputHeight,
  },
  textarea: {
    ...shared.input,
    minHeight: sizes.textareaHeight,
    resize: 'vertical',
  },
  validatedInput: {
    marginBottom: 50,
  },
  inputErr: {
    marginBottom: 0,
  },
  label: {
    color: colors.header,
    display: 'block',
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
});
