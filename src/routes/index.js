import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import store from 'store';
import App from '../containers/App';
import Users from '../containers/Users';
import ViewUser from '../containers/ViewUser';
import EditUser from '../containers/EditUser';
import CreateUser from '../containers/CreateUser';
import Login from '../containers/Login';
import Page404 from '../containers/Page404';

function requireAuth(nextState, replaceState) {
  if (!store.get('token')) {
    store.set('nextRoute', nextState.location.pathname);
    replaceState('/login');
  }
}

function doNotRequireAuth(nextState, replaceState) {
  if (store.get('token') && (nextState.location.pathname === '/login')) {
    replaceState('/');
  }
}

const Routes = ({ store: theStore, history }) =>
  <Provider store={theStore}>
    <Router history={history}>
      <Redirect from="/" to="users" />
      <Route path="/">
        <Route component={App} onEnter={requireAuth}>
          <Route path="users">
            <IndexRoute component={Users} />
            <Route path="create" component={CreateUser} />
            <Route path=":userId" component={ViewUser} />
            <Route path=":userId/edit" component={EditUser} />
          </Route>
        </Route>
        <Route onEnter={doNotRequireAuth}>
          <Route path="login" component={Login} />
          <Route path="*" component={Page404} />
        </Route>
      </Route>
    </Router>
  </Provider>;

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Routes;
