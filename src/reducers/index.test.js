import { createStore } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './';

describe('root reducer', () => {
  it('should return initial state for combined reducers', () => {
    const store = createStore(rootReducer);
    expect(store.getState()).toEqual(fromJS({
      form: {},
      user: {},
    }));
  });
});
