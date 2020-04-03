import { SET_SUPPORT_ITEMS, SET_SUPPORT_ITEMS_ERROR, SET_SUPPORT_ITEMS_STATUS } from './actionTypes';
import { ISupportItems } from './actions';
import { Fetching, Success, FetchError } from '../../helpers/variables';

interface IAction {
  type?: string;
  items?: ISupportItems[];
  error?: string;
  status?: string;
}

export interface IState {
  items?: ISupportItems[];
  error?: string;
  status?: string;
}

// support reducer
export const initialState: IState = {
  items: [],
  error: '',
  status: Fetching
};

export default function supportItems(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_SUPPORT_ITEMS:
      return {
        ...state,
        items: action.items,
        status: Success
      };
    case SET_SUPPORT_ITEMS_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_SUPPORT_ITEMS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
