import { IState } from './interfaces';
import {
  FETCH_LEADSTAGES,
  FETCH_LEADSTAGES_FAILURE,
  FETCH_LEADSTAGES_SUCCESS
} from './actionTypes';

export const initialState: IState = {
  leadStages: [],
  isLoading: false,
  error: false
};

export default function reducer(state: IState = initialState, action: any) {
  switch (action.type) {
    case FETCH_LEADSTAGES:
      return { ...state, isLoading: action.payload };
    case FETCH_LEADSTAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_LEADSTAGES_SUCCESS:
      return { ...state, isLoading: false, leadStages: action.payload };
    default:
      return state;
  }
}
