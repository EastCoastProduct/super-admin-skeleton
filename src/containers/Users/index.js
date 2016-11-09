import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { formValueSelector } from 'redux-form/immutable';
import { css } from 'aphrodite/no-important';
import { paginationChange, usersGetFetch } from '../../actions/users';
import { PAGINATION } from '../../constants/application';
import UsersFiltersForm from '../../components/UsersFiltersForm';
import Pagination from '../../components/Pagination';
import styles from './styles';

export class UsersComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleGetUsers = this.handleGetUsers.bind(this);
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.handleGetUsers(props.users.get('page'));
  }

  handleGetUsers(filters, cb) {
    const { dispatch } = this.props;
    dispatch(usersGetFetch({ limit: PAGINATION, ...filters }, cb));
  }

  handleFiltersSubmit(values) {
    const { dispatch } = this.props;
    this.handleGetUsers({ page: 1, ...values.toJS() }, () =>
      dispatch(paginationChange(1))
    );
  }

  handlePaginationChange(page) {
    const { dispatch, filters } = this.props;

    this.handleGetUsers({ page, ...filters }, () =>
      dispatch(paginationChange(page))
    );
  }

  handleUserClick(id) {
    const { router } = this.props;
    router.push(`/user/${id}`);
  }

  clickHandler(id) {
    return () => this.handleUserClick(id);
  }

  renderTableBody() {
    const { users } = this.props;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return users.get('list').map((item, index) =>
      <tr
        className={css(styles.row)}
        key={index}
        onClick={this.clickHandler(item.get('id'))}
      >
        <td className={css(styles.cell)}>{item.get('firstname') || 'N/A'}</td>
        <td className={css(styles.cell)}>{item.get('lastname') || 'N/A'}</td>
        <td className={css(styles.cell)}>{item.get('email')}</td>
        <td className={css(styles.cell)}>{item.get('bio') || 'N/A'}</td>
        <td className={css(styles.cell)}>{item.get('confirmed').toString()}</td>
      </tr>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

  render() {
    const { users } = this.props;

    return (
      <main className={css(styles.page)}>
        <h1 className={css(styles.header)}>Users</h1>
        <div className={css(styles.filters)}>
          <UsersFiltersForm
            className={styles.userFilters}
            handleFiltersSubmit={this.handleFiltersSubmit}
          />
          <Link className={css(styles.button)} to="/user">Add User</Link>
        </div>
        {users.get('listTotal') > 0 &&
          <table className={css(styles.table)}>
            <thead>
              <tr className={css(styles.headerRow)}>
                <th className={css(styles.cell)}>First Name</th>
                <th className={css(styles.cell)}>Last Name</th>
                <th className={css(styles.cell)}>Email</th>
                <th className={css(styles.cell)}>Bio</th>
                <th className={css(styles.cell)}>Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableBody()}
            </tbody>
            <tfoot className={css(styles.foot)}>
              <tr>
                <td colSpan="4">
                  <Pagination
                    className={styles.pagination}
                    currentPage={users.get('page')}
                    itemsPerPage={PAGINATION}
                    onPaginationChange={this.handlePaginationChange}
                    total={users.get('listTotal')}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        }
      </main>
    );
  }
}

export default connect(state => ({
  filters: formValueSelector('UsersFilters')(state, 'confirmed', 'search'),
  users: state.get('users'),
}))(withRouter(UsersComponent));

