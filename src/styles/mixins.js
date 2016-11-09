import { colors, sizes, transitions } from './variables';

const shared = {
  clearfix: {
    content: '""',
    display: 'table',
  },
};

export const button = {
  backgroundColor: colors.input,
  border: `2px solid ${colors.header}`,
  boxShadow: `1px 1px ${colors.shadow}`,
  borderRadius: sizes.radius,
  color: colors.font,
  cursor: 'pointer',
  fontWeight: 700,
  outline: 'none',
  padding: 10,
  textAlign: 'center',
  textTransform: 'uppercase',
  transition: transitions.base,
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
};

export const clearfix = {
  ':before': {
    ...shared.clearfix,
  },
  ':after': {
    ...shared.clearfix,
    clear: 'both',
  },
};
