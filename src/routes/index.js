import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Users from '../containers/Users';
import Login from '../containers/Login';
import Page404 from '../containers/Page404';

const Routes = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <Route component={App}>
          <IndexRoute component={Users} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="*" component={Page404} />
      </Route>
    </Router>
  </Provider>;

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Routes;
