// It can't be exported as es6 default module because styling wouldn't work
// correctly so we need to use module.exports

const { colors, fonts } = require('./variables');

module.exports = {
  body: {
    backgroundColor: colors.background,
    boxSizing: 'border-box',
    color: colors.font,
    fontFamily: fonts.main,
    fontSize: fonts.size,
    fontWeight: 500,
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    lineHeight: 1,
  },
  '*': {
    boxSizing: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6, ul': {
    margin: 0,
    padding: 0,
  },
  'button, input, optgroup, select, textarea': {
    fontFamily: fonts.main,
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  h1: {
    fontSize: 32,
  },
  b: {
    fontWeight: 700,
  },
  table: {
    borderCollapse: 'collapse',
  },
};
