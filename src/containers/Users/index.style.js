import { StyleSheet } from 'aphrodite/no-important';
import variables from '../../styles/variables';
import mixins from '../../styles/mixins';

const { colors, transition } = variables;

export default StyleSheet.create({
  page: {
    ...mixins.clearfix,
  },
  header: {
    float: 'left',
    marginBottom: 20,
  },
  filters: {
    ...mixins.clearfix,
    float: 'right',
    marginBottom: 13,
  },
  searchBar: {
    float: 'left',
    width: 350,
  },
  button: {
    float: 'left',
    marginLeft: 40,
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
    borderBottom: `1px solid ${colors.shadowRow}`,
    transition: transition.base,
    ':hover': {
      backgroundColor: colors.selected,
    },
    ':last-child': {
      borderBottom: 0,
    },
  },
  headerRow: {
    backgroundColor: colors.tableHeaderBcg,
    color: colors.tableHeader,
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
