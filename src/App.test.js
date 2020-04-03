import React from 'react';
import App from './App';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from './store/Auth/reducers';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunkMiddleware]);

describe('Store Conntected', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      auth: initialState
    });

    component = shallow(
      <Provider store={store}><App /></Provider>,
    );
  });

  it('renders APP without crashing', () => {
    expect(component);
  });
});

