import { StyleSheet } from 'aphrodite/no-important';

const shared = {
  inputs: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
};

export default StyleSheet.create({
  checkbox: {
    ...shared.inputs,
    marginRight: 40,
  },
  searchBar: {
    ...shared.inputs,
    width: 350,
  },
});
