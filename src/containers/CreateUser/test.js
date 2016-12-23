import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import deepMerge from 'deepmerge';
import { CreateUserComponent } from './';
import * as Actions from '../../actions/user';

describe('CreateUser component', () => {
  const id = 1;
  const props = {
    dispatch: jest.fn(() => Promise.resolve(id)),
    form: 'CreateUser',
    handleSubmit: f => f,
    router: {
      push: jest.fn(),
    },
    submitting: true,
  };
  const wrapper = shallow(<CreateUserComponent {...props} />);

  describe('snapshot', () => {
    it('renders required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders required data with error', () => {
      const newProps = deepMerge(props, {
        error: 'User already exists.',
        submitting: false,
      });
      const newWrapper = shallow(<CreateUserComponent {...newProps} />);

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    afterEach(() => {
      jest.resetAllMocks(); // move to before when clearAllMocks gets out
    });
    Actions.userCreateFetch = jest.fn();
    const instance = wrapper.instance();

    it('handleUserCreate method', () => {
      const values = fromJS({
        email: 'test@email.com',
      });
      const p = instance.handleUserCreate(values);

      expect(Actions.userCreateFetch).toHaveBeenCalledWith(values);
      expect(instance.props.dispatch).toHaveBeenCalled();
      return p.then(() => {
        expect(instance.props.router.push).toHaveBeenCalledWith(`/user/${id}`);
      });
    });
  });
});
