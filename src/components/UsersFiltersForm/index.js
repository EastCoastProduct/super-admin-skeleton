import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { css } from 'aphrodite/no-important';
import Checkbox from '../Checkbox';
import SearchBar from '../SearchBar';
import styles from './styles';

export const UsersFiltersFormComponent = (props) => {
  const { className, handleFiltersSubmit, handleSubmit } = props;

  return (
    <form
      className={css(className && className)}
      onSubmit={handleSubmit(handleFiltersSubmit)}
      noValidate
    >
      <Field
        className={styles.checkbox}
        name="confirmed"
        component={Checkbox}
        onChange={handleSubmit(handleFiltersSubmit)}
        label="Show only confirmed users"
      />
      <Field
        className={styles.searchBar}
        name="search"
        component={SearchBar}
        type="text"
        placeholder="Search by email, first and last name"
        normalize={value => `%${value}%`}
        format={value => value.slice(1, -1)}
      />
    </form>
  );
};

UsersFiltersFormComponent.propTypes = {
  className: PropTypes.object,
  handleFiltersSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'UsersFilters',
})(UsersFiltersFormComponent);