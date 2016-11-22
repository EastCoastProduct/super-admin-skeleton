import { StyleSheet } from 'aphrodite/no-important';
import { colors, sizes } from '../../styles/variables';

const shared = {
  input: {
    background: colors.input,
    border: `1px solid ${colors.header}`,
    borderRadius: sizes.radius,
    boxShadow: `inset 1px 1px ${colors.shadow}`,
    color: colors.font,
    padding: '9px 10px',
    width: '100%',
  },
};

export default StyleSheet.create({
  holder: {
    marginBottom: 20,
  },
  input: {
    ...shared.input,
    height: sizes.inputHeight,
  },
  textarea: {
    ...shared.input,
    minHeight: sizes.textareaHeight,
    resize: 'vertical',
  },
  validatedHolder: {
    marginBottom: 50,
  },
  errHolder: {
    marginBottom: 15,
  },
  label: {
    color: colors.header,
    display: 'block',
    fontWeight: 700,
    marginBottom: 5,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  error: {
    margin: '5px 0 0',
  },
});
