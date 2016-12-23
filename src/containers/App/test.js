import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { superadmin } from '../../fixtures/superadmin';
import { AppComponent } from './';
import * as Actions from '../../actions/auth';

describe('App component', () => {
  const props = {
    dispatch: jest.fn(),
    router: {
      push: jest.fn(),
    },
    superadmin: fromJS(superadmin),
  };
  const wrapper = shallow(
    <AppComponent {...props}>
      <main>Test</main>
    </AppComponent>
  );

  describe('snapshot', () => {
    it('renders basic required data', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    afterEach(() => {
      jest.resetAllMocks(); // move to before when clearAllMocks gets out
    });
    Actions.logoutAction = jest.fn();
    const instance = wrapper.instance();

    it('handleLogout method', () => {
      const event = {
        preventDefault: jest.fn(),
      };
      instance.handleLogout(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(Actions.logoutAction).toHaveBeenCalled();
      expect(instance.props.dispatch).toHaveBeenCalled();
      expect(instance.props.router.push).toHaveBeenCalledWith('/login');
    });
  });
});
