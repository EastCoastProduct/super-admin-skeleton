import { StyleSheet } from 'aphrodite/no-important';
import { button } from '../../styles/mixins';

export default StyleSheet.create({
  term: {
    display: 'inline-block',
    fontWeight: 700,
    marginBottom: 20,
    textAlign: 'right',
    textTransform: 'uppercase',
    verticalAlign: 'middle',
    width: 100,
  },
  data: {
    display: 'inline-block',
    margin: '0 0 20px 25px',
    verticalAlign: 'middle',
    width: 'calc(100% - 125px)',
  },
  link: {
    ...button,
    display: 'block',
    textDecoration: 'none',
    width: 150,
  },
});
