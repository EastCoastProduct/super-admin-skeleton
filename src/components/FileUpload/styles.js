import { StyleSheet } from 'aphrodite/no-important';
import { colors } from '../../styles/variables';
import { button } from '../../styles/mixins';

export default StyleSheet.create({
  file: {
    display: 'none',
  },
  emptyImage: {
    backgroundColor: colors.background,
    borderRadius: '50%',
    height: 200,
    marginBottom: 35,
    padding: '75px 72px',
    position: 'relative',
    width: 200,
  },
  validatedImage: {
    marginBottom: 50,
  },
  errImage: {
    marginBottom: 0,
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
});
