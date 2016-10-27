// It can't be exported as es6 default module because styling wouldn't work
// correctly so we need to use module.exports

module.exports = {
  fonts: {
    main: 'Raleway',
    size: 16,
  },
  colors: {
    background: '#dbdbdb',
    borderAlt: '#38334b',
    contentBcg: '#f5f5f5',
    error: '#791b23',
    errorBcg: '#ffbbbb',
    font: '#3d3d3d',
    header: '#4a4a4a',
    input: '#fff',
    selected: '#d4e5ee',
    shadow: '#a0a0a0',
    shadowAlt: '#a5a5a5',
    shadowRow: '#d1d4dd',
    tableHeader: '#55515c',
    tableHeaderBcg: '#bdbdbd',
  },
  sizes: {
    header: 70,
    loginBox: 580,
    inputHeight: 40,
    navigation: 200,
    radius: 3,
    radiusBig: 25,
  },
  transition: {
    base: 'all 0.3s',
  },
};
