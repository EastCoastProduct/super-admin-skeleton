import { StyleSheet } from 'aphrodite/no-important';
import { colors } from '../../styles/variables';
import { button } from '../../styles/mixins';

export default StyleSheet.create({
  holder: {
    marginBottom: 35,
  },
  file: {
    display: 'none',
  },
  emptyImage: {
    backgroundColor: colors.background,
    borderRadius: '50%',
    height: 200,
    padding: '75px 72px',
    position: 'relative',
    width: 200,
  },
  validatedHolder: {
    marginBottom: 50,
  },
  errHolder: {
    marginBottom: 15,
  },
  icon: {
    color: colors.header,
    fontSize: 50,
  },
  button: {
    ...button,
    bottom: 0,
    left: 0,
    position: 'absolute',
    textAlign: 'center',
    width: 150,
  },
  error: {
    margin: '5px 0 0',
  },
});
