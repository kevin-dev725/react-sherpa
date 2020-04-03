import {
  FETCH_PROSPECT_MESSAGES_LIST_SUCCESS,
  FETCH_PROSPECT_MESSAGES_LIST_ERROR,
  SET_PROSPECT_MESSAGES_LIST_STATUS,
  UPDATE_PROSPECT_MESSAGES,
  UPDATE_PROSPECT_MESSAGE
} from './actionTypes';
import { IMessage } from './actions';
import { Fetching, Success, FetchError } from '../../../helpers/variables';

interface IAction {
  type: string;
  data?: IMessage[];
  note?: any;
  id?: number;
  index?: number;
  error?: string;
  status?: string;
}

export interface IState {
  error?: string;
  list?: IMessage[];
  status?: string;
}

const initialState = {
  error: '',
  list: {},
  status: Fetching
};

export const path = ['prospectDetailsReducer', 'prospectMessages'];

export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_PROSPECT_MESSAGES_LIST_STATUS:
      return {
        ...state,
        status: action.status
      };
    case UPDATE_PROSPECT_MESSAGES:
    case FETCH_PROSPECT_MESSAGES_LIST_SUCCESS:
      return {
        ...state,
        list: { ...state.list, ...action.payload },
        status: Success
      };
    case FETCH_PROSPECT_MESSAGES_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    case UPDATE_PROSPECT_MESSAGE:
      const { payload } = action;
      // const messages = { ...state.list[message.id] };
      // messages.splice(index, 0, message);

      return {
        ...state,
        list: {
          ...state.list,
          [payload.prospect]: {
            ...state.list[payload.prospect],
            [payload.id]: payload
          }
        }
      }
    default:
      return state;
  }
}
