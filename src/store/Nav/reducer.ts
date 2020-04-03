import {
  SET_PATH
} from './actionTypes';

interface IState {
  path: string;
}

export const initialState: IState = {
  path: '/'
};

export default function reducer(state: IState = initialState, action: any) {
  switch (action.type) {
    case SET_PATH:
      return { ...state, path: action.payload };
    default:
      return state;
  }
}
