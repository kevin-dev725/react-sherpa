import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { initialState } from '../../store/Auth/reducers';
import { setAuthenticated, setAuthError } from '../../store/Auth/actions';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunkMiddleware]);

// mocking the authenticate action
const authenticate = (credentials, continuation) => {
  return (dispatch, _) => {
    return new Promise((resolve, reject) => {
      let { username, password } = credentials;
      if (username === 'diego' && password === 'pass123')
        resolve({ access: 'lskdflkdj', refresh: 'lksdlfdjsf' })
      else
        reject({ response: { data: { detail: "bad credentials" } } })
    })
      .then((data) => {
        dispatch(setAuthenticated(data));
        continuation();
      })
      .catch(({ response }) => {
        const { data: { detail } } = response;
        dispatch(setAuthError(detail));
      })
  };
}

describe('Store Conntected', () => {
  let store;
  let data = { username: 'diego', password: 'pass123' };
  beforeEach(() => {
    store = mockStore({
      auth: initialState
    });
    store.clearActions();
  });

  it('Succeeds Authentication', () => {
    let expectedActions = [{
      type: 'SET_AUTH_STATE', access: 'lskdflkdj', refresh: 'lksdlfdjsf'
    }];
    store.dispatch(
      authenticate(data, () => console.log("RE-ROUTE to campaigns")))
      .then(() => {
        console.log("DATA", store.getState())
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

  it('Fails Authentication', () => {
    let expectedActions = [{
      type: 'SET_AUTH_ERROR', error: 'bad credentials'
    }];
    data.username = 'diego2';
    store.dispatch(
      authenticate(data, () => console.log("SHOULD NOT GET CALLED")))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
