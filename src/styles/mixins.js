const shared = {
  clearfix: {
    content: '""',
    display: 'table',
  },
};

export default {
  clearfix: {
    ':before': {
      ...shared.clearfix,
    },
    ':after': {
      ...shared.clearfix,
      clear: 'both',
    },
  },
};
