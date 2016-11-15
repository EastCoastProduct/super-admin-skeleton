import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { UsersFiltersFormComponent } from './';

describe('UsersFiltersForm component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders and submits on click', () => {
    const reduxFormProps = {
      form: 'Form',
      handleFiltersSubmit: jest.fn(),
      handleSubmit: jest.fn(cb => cb()),
    };
    const wrapper = shallow(
      <UsersFiltersFormComponent {...reduxFormProps} />
    );
    wrapper.find('form').simulate('submit');

    expect(reduxFormProps.handleSubmit)
      .toHaveBeenCalledWith(reduxFormProps.handleFiltersSubmit);
    expect(reduxFormProps.handleFiltersSubmit).toHaveBeenCalled();
  });
});
