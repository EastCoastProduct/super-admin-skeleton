import * as redux from 'redux';
import { configureStore } from './';

describe('store', () => {
  beforeEach(() => {
    spyOn(redux, 'compose').and.callThrough();
    window.devToolsExtension = jest.fn(() => (f => f));
  });
  afterAll(() => {
    window.devToolsExtension = undefined; // delete window.prop doesn't work
  });

  it('should test development environment configuration with devTools', () => {
    configureStore('development');
    expect(redux.compose.calls.first().args.length).toBe(2);
    expect(window.devToolsExtension).toHaveBeenCalled();
  });

  it('should test development environment configuration without devTools',
    () => {
      window.devToolsExtension = undefined; // delete window.prop doesn't work
      configureStore('development');
      expect(redux.compose.calls.first().args.length).toBe(2);
      expect(window.devToolsExtension).toBeUndefined();
    }
  );

  it('should test other environments configuration', () => {
    configureStore('production');
    expect(redux.compose.calls.first().args.length).toBe(1);
    expect(window.devToolsExtension).not.toHaveBeenCalled();
  });
});
