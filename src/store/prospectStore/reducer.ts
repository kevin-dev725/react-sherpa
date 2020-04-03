import { IProspectStore, IProspect } from './interfaces';
import {
  FETCH_PROSPECTS,
  FETCH_PROSPECTS_FAILURE,
  FETCH_PROSPECTS_SUCCESS,
  UPDATE_PROSPECT_LIST,
  UPDATE_PROSPECT_SUCCESS,
  DELETE_PROSPECT_SUCCESS,
  RESET_PROSPECTS,
  FETCH_PROSPECT,
  FETCH_PROSPECT_SUCCESS,
  FETCH_PROSPECT_NEXT_PAGE,
} from './actionTypes';

const initialState: IProspectStore = {
  isLoading: false,
  isLoadingMore: false,
  error: false,
  prospects: {} as { [key: number]: IProspect },
  next: null,
  previous: null
}

export const path = ['prospectStore'];

export default function reducer(state: IProspectStore = initialState, action: any) {
  switch (action.type) {
    case FETCH_PROSPECT:
    case FETCH_PROSPECT_SUCCESS:
    case FETCH_PROSPECTS:
      return {
        ...state,
        isLoading: action.payload
      }
    case FETCH_PROSPECTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case FETCH_PROSPECTS_SUCCESS:
      return {
        ...state,
        prospects: { ...state.prospects, ...action.payload.results },
        next: action.payload.next,
        previous: action.payload.previous,
        isLoading: false
      }
    case UPDATE_PROSPECT_LIST: {
      let newState = { ...state };
      newState.prospects = { ...newState.prospects, ...action.payload.results };

      if (action.payload.overridePages) {
        newState.next = action.payload.next;
        newState.previous = action.payload.previous;
      }

      return newState;
    }
    case UPDATE_PROSPECT_SUCCESS: {
      let id = action.payload.id;
      let newState = { ...state };
      const prospect = newState.prospects[id];

      newState.prospects[id] = {
        ...prospect,
        ...action.payload
      };

      return newState;
    }
    case DELETE_PROSPECT_SUCCESS: {
      let newState = { ...state };
      delete newState.prospects[action.paydload.id];

      return newState;
    }

    case FETCH_PROSPECT_NEXT_PAGE: {
      return {
        ...state,
        isLoadingMore: action.payload
      };
    }
    case RESET_PROSPECTS:
      return {
        ...state,
        prospects: {}
      };
    default:
      return state;
  };
}
