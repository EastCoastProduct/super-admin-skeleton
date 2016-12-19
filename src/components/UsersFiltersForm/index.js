import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { css } from 'aphrodite/no-important';
import Checkbox from '../Checkbox';
import SearchBar from '../SearchBar';
import styles from './styles';

export function UsersFiltersForm(props) {
  const { className, form, handleFiltersSubmit, handleSubmit } = props;

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
        id={form}
        onChange={handleSubmit(handleFiltersSubmit)}
        label="Show only confirmed users"
      />
      <Field
        className={styles.searchBar}
        name="search"
        component={SearchBar}
        placeholder="Search by email, first and last name"
        normalize={value => `%${value}%`}
        format={value => (value ? value.slice(1, -1) : '')}
      />
    </form>
  );
}

UsersFiltersForm.propTypes = {
  className: PropTypes.object,
  form: PropTypes.string.isRequired,
  handleFiltersSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'UsersFilters',
})(UsersFiltersForm);
