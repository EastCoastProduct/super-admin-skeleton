import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
// import { usersGetFetch } from '../../actions/users';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import styles from './index.style';

export class UsersComponent extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
  };

  // constructor(props) {
  //   super(props);
  //   this.getUsers();
  // }

  // getUsers() {
  //   const { dispatch } = this.props;
  //   dispatch(usersGetFetch();
  // }

  renderTableBody() {
    const { users } = this.props;

    return users.get('list').map((item, index) =>
      <tr className={css(styles.row)} key={index}>
        <td className={css(styles.cell)}>{item.get('firstname')}</td>
        <td className={css(styles.cell)}>{item.get('lastname')}</td>
        <td className={css(styles.cell)}>{item.get('email')}</td>
        <td className={css(styles.cell)}>{item.get('confirmed').toString()}</td>
      </tr>
    );
  }

  render() {
    const { users } = this.props;

    return (
      <main className={css(styles.page)}>
        <h1 className={css(styles.header)}>Users</h1>
        <div className={css(styles.filters)}>
          <SearchBar style={styles.searchBar} />
          <Button style={styles.button}>Add User</Button>
        </div>
        {users.get('list').size > 0 &&
          <table className={css(styles.table)}>
            <thead>
              <tr className={css(styles.headerRow)}>
                <th className={css(styles.cell)}>First Name</th>
                <th className={css(styles.cell)}>Last Name</th>
                <th className={css(styles.cell)}>Email</th>
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
                    style={styles.pagination}
                    currentPage={6}
                    itemsPerPage={10}
                    onPaginationChange={() => {}}
                    total={167}
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
  users: state.get('users'),
}))(UsersComponent);

