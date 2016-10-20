import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutAction } from '../../actions/auth';

export class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const { dispatch, router } = this.props;
    dispatch(logoutAction(router));
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <nav>
          <a href onClick={this.handleLogout}>Logout</a>
        </nav>
        <main>{children}</main>
      </div>
    );
  }
}

export default connect()(withRouter(AppComponent));
