import { StyleSheet } from 'aphrodite/no-important';
import { colors, transitions } from '../../styles/variables';
import { button, clearfix } from '../../styles/mixins';

const shared = {
  filters: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
};

export default StyleSheet.create({
  page: {
    ...clearfix,
  },
  header: {
    float: 'left',
    marginBottom: 20,
  },
  filters: {
    ...clearfix,
    float: 'right',
    marginBottom: 13,
  },
  userFilters: {
    ...shared.filters,
  },
  button: {
    ...button,
    ...shared.filters,
    marginLeft: 40,
    textDecoration: 'none',
    width: 150,
  },
  table: {
    background: colors.contentBcg,
    borderRadius: 3,
    boxShadow: `0 1px ${colors.shadow}`,
    overflow: 'hidden',
    textAlign: 'left',
    width: '100%',
  },
  row: {
    borderBottom: `1px solid ${colors.tableBorder}`,
    cursor: 'pointer',
    transition: transitions.base,
    ':hover': {
      backgroundColor: colors.selected,
    },
    ':last-child': {
      borderBottom: 0,
    },
  },
  headerRow: {
    backgroundColor: colors.tableHeader,
    color: colors.header,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  cell: {
    padding: '22px 25px',
  },
  foot: {
    textAlign: 'center',
  },
  pagination: {
    padding: '25px 35px',
  },
});
