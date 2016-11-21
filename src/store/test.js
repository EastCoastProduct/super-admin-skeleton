import * as redux from 'redux';
import { configureStore } from './';

describe('store', () => {
  beforeEach(() => {
    global.window = {
      devToolsExtension: jest.fn(() => (f => f)),
    };
    spyOn(redux, 'compose').and.callThrough();
  });
  afterEach(() => {
    delete global.window;
  });

  it('should test development environment configuration with devTools', () => {
    configureStore('development');
    expect(redux.compose.calls.first().args.length).toBe(2);
    expect(window.devToolsExtension).toHaveBeenCalled();
  });

  it('should test development environment configuration without devTools',
    () => {
      global.window = {};
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
