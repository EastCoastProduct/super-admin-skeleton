import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(env) {
  let createStoreWithMiddleware;

  if (env === 'development') {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        createStoreWithMiddleware.replaceReducer(rootReducer);
      });
    }
  } else {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
    )(createStore);
  }

  return createStoreWithMiddleware(rootReducer);
}

export default configureStore(process.env.NODE_ENV);
