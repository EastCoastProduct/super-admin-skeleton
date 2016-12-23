import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import deepMerge from 'deepmerge';
import { fullProfile, profile } from '../../fixtures/user';
import { ViewUserComponent } from './';
import * as Actions from '../../actions/user';

describe('ViewUser component', () => {
  const props = {
    dispatch: jest.fn(),
    params: {
      userId: profile.id,
    },
    profile: fromJS(profile),
  };
  const wrapper = shallow(<ViewUserComponent {...props} />);

  describe('snapshot', () => {
    it('renders empty required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders full required data', () => {
      const newProps = deepMerge(props, {
        params: {
          userId: fullProfile.id,
        },
      });
      newProps.profile = fromJS(fullProfile);
      const newWrapper = shallow(<ViewUserComponent {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    Actions.userGetFetch = jest.fn();
    const instance = wrapper.instance();

    it('handleGetUser method', () => {
      instance.handleGetUser();

      expect(Actions.userGetFetch)
        .toHaveBeenCalledWith(instance.props.params.userId);
      expect(instance.props.dispatch).toHaveBeenCalled();
    });
  });
});
