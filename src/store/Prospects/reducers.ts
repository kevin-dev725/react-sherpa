import {
  SET_PROSPECTS_SEARCH_STATUS,
  SET_SEARCH_PROSPECTS_ERROR,
  SET_SEARCHED_PROSPECTS,
  SET_MORE_PROSPECTS,
  RESET_PROSPECT_DATA,
  SET_PROSPECTS_FETCH_MORE_STATUS
} from './actionTypes';
import { Success } from '../../helpers/variables';

interface IState {
  count: number;
  next: string | null;
  previous: string | null;
  prospects: Array<any>;
  status: string | null;
  fetchMoreStatus: string | null;
}

const initialState: IState = {
  count: 0,
  next: null,
  previous: null,
  prospects: [],
  status: null,
  fetchMoreStatus: null
};

export default function reducer(state: IState = initialState, action: any) {
  switch (action.type) {
    case SET_PROSPECTS_SEARCH_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_PROSPECTS_FETCH_MORE_STATUS:
      return {
        ...state,
        fetchMoreStatus: action.status
      };
    case SET_SEARCH_PROSPECTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SET_SEARCHED_PROSPECTS:
      return {
        ...state,
        prospects: action.data.results,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
        status: Success
      };
    case SET_MORE_PROSPECTS:
      let newProspects = [...state.prospects, ...action.data.results];
      return {
        ...state,
        prospects: newProspects,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
        fetchMoreStatus: Success
      };
    case RESET_PROSPECT_DATA:
      return initialState;
    default:
      return state;
  }
}
