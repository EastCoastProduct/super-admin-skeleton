import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import deepMerge from 'deepmerge';
import { fullProfile, profile } from '../../fixtures/user';
import { createFile, createFileList } from '../../fixtures/fileAPI';
import { EditUserComponent } from './';
import * as Actions from '../../actions/user';

describe('EditUser component', () => {
  const props = {
    dispatch: jest.fn(() => Promise.resolve()),
    form: 'EditUser',
    handleSubmit: f => f,
    params: {
      userId: 1
    },
    profile: fromJS(profile),
    router: {
      push: jest.fn(),
    },
    submitting: true,
  };
  const wrapper = shallow(<EditUserComponent {...props} />);

  describe('snapshot', () => {
    it('renders required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders required data with error', () => {
      const newProps = deepMerge(props, {
        error: 'User not found.',
        params: {
          userId: 999,
        },
        submitting: false,
      });
      newProps.profile = fromJS(fullProfile);
      const newWrapper = shallow(<EditUserComponent {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    afterEach(() => {
      jest.resetAllMocks(); // move to before when clearAllMocks gets out
    });
    Actions.userGetFetch = jest.fn();
    Actions.userUpdateFetch = jest.fn();
    const instance = wrapper.instance();

    it('handleUserUpdate method', () => {
      const values = fromJS({
        image: createFileList(),
        firstname: 'John',
        lastname: 'Doe',
        bio: 'This is my bio.',
      });
      const p = instance.handleUserUpdate(values);

      expect(Actions.userUpdateFetch)
        .toHaveBeenCalledWith(values, instance.props.params.userId);
      expect(instance.props.dispatch).toHaveBeenCalled();
      return p.then(() => {
        expect(instance.props.router.push).toHaveBeenCalledWith(
          `/user/${instance.props.params.userId}`);
      });
    });

    it('handleGetUser method', () => {
      instance.handleGetUser();

      expect(Actions.userGetFetch)
        .toHaveBeenCalledWith(instance.props.params.userId);
      expect(instance.props.dispatch).toHaveBeenCalled();
    });
  });
});
