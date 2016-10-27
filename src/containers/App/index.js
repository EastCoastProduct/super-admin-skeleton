import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';
import { logoutAction } from '../../actions/auth';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import styles from './index.style';

export class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    superadmin: PropTypes.object.isRequired,
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
    const { children, superadmin } = this.props;

    return (
      <div>
        <Header
          handleLogout={this.handleLogout}
          superadmin={superadmin}
        />
        <Navigation />
        <div className={css(styles.content)}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  superadmin: state.get('superadmin'),
}))(withRouter(AppComponent));
