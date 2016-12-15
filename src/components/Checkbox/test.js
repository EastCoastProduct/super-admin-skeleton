import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import Checkbox from './';

describe('Checkbox component', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.resetAllMocks(); // move to before when clearAllMocks gets out
  });

  const wrapper = shallow(
    <Checkbox
      id="Form"
      label="This is checkbox"
      input={{ name: 'checkbox', value: false, onChange: jest.fn() }}
      meta={{}}
      onChange={jest.fn()}
    />
  );
  const instance = wrapper.instance();

  it('trigger onChange event', () => {
    const e = { target: { checked: true } };
    wrapper.find('input').simulate('change', e);
    jest.runAllTimers();

    expect(instance.props.input.onChange).toHaveBeenCalledWith(e);
    expect(instance.props.onChange).toHaveBeenCalled();
  });
});
