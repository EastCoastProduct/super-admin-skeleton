// It can't be exported as es6 default module because default styling wouldn't
// work correctly so we need to use module.exports

const colors = {
  background: '#dbdbdb',
  contentBcg: '#f5f5f5',
  error: '#791b23',
  errorBcg: '#ffbbbb',
  font: '#3d3d3d',
  header: '#4a4a4a',
  input: '#fff',
  selected: '#d4e5ee',
  shadow: '#a0a0a0',
  tableBorder: '#d1d4dd',
  tableHeader: '#bdbdbd',
};

const fonts = {
  main: 'Raleway',
  size: 16,
};

const sizes = {
  header: 70,
  contentBox: 580,
  inputHeight: 40,
  navigation: 200,
  radius: 3,
  radiusBig: 25,
  textareaHeight: 80,
};

const transitions = {
  base: 'all 0.3s',
};

const zIndex = {
  header: 2,
  navigation: 1,
};

module.exports = {
  colors,
  fonts,
  sizes,
  transitions,
  zIndex,
};
