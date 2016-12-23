import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import deepMerge from 'deepmerge';
import { LoginComponent } from './';
import * as Actions from '../../actions/auth';

jest.mock('../../images/ecp_logo.png', () => 'ecp_logo.png');

describe('Login component', () => {
  const props = {
    dispatch: jest.fn(() => Promise.resolve()),
    form: 'Login',
    handleSubmit: f => f,
    router: {
      push: jest.fn(),
    },
    submitting: true,
  };
  const wrapper = shallow(<LoginComponent {...props} />);

  describe('snapshot', () => {
    it('renders required data', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders required data with error', () => {
      const newProps = deepMerge(props, {
        error: 'User not found.',
        submitting: false,
      });
      const newWrapper = shallow(<LoginComponent {...newProps} />)

      expect(newWrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    afterEach(() => {
      jest.resetAllMocks(); // move to before when clearAllMocks gets out
    });
    Actions.loginFetch = jest.fn();
    const instance = wrapper.instance();

    it('handleLogin method', () => {
      const values = fromJS({
        email: 'test@email.com',
        password: 'Aa123456',
      });
      const p = instance.handleLogin(values);

      expect(Actions.loginFetch).toHaveBeenCalledWith(values);
      expect(instance.props.dispatch).toHaveBeenCalled();
      return p.then(() => {
        expect(instance.props.router.push).toHaveBeenCalledWith('/');
      });
    });
  });
});
