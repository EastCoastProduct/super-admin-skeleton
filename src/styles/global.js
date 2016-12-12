import { StyleSheet } from 'aphrodite/no-important';
import { colors, fonts } from './variables';

const GLOBALS = '__GLOBAL_STYLES__';

const globalExtension = {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) =>
    (baseSelector.includes(GLOBALS) ? generateSubtreeStyles(selector) : null),
};

const extended = StyleSheet.extend([globalExtension]);

const styles = extended.StyleSheet.create({
  [GLOBALS]: {
    body: {
      backgroundColor: colors.background,
      boxSizing: 'border-box',
      color: colors.font,
      fontFamily: fonts.main,
      fontSize: fonts.size,
      fontWeight: 500,
      lineHeight: 1,
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
    },
    '*': {
      boxSizing: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
    },
    'p, h1, h2, h3, h4, h5, h6, ul, dl, dt, dd': {
      margin: 0,
      padding: 0,
    },
    'button, input, optgroup, select, textarea': {
      fontFamily: fonts.main,
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    'a, button': {
      cursor: 'pointer',
    },
    a: {
      color: 'inherit',
      fontWeight: 700,
      textTransform: 'uppercase',
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
  },
});

export default extended.css(styles[GLOBALS]);
