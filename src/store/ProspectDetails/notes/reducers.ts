import {
  POPULATE_PROSPECT_NOTES,
  SET_PROSPECT_NOTE_ERROR,
  SET_PROSPECT_NOTES_STATUS,
  ADD_PROSPECT_NOTE,
  EDIT_PROSPECT_NOTE,
  DELETE_PROSPECT_NOTE,
  RESTORE_PROSPECT_NOTE
} from './actionTypes';
import { INote, IResults } from './actions';
import { Fetching, Success, FetchError } from '../../../helpers/variables';

interface IAction {
  type: string;
  data?: IResults;
  note?: any;
  id?: number;
  index?: number;
  error?: string;
  status?: string;
}

export interface IState {
  error?: string;
  list?: INote[];
  status?: string;
}

const initialState: IState & IResults = {
  count: 0,
  next: null,
  previous: null,
  error: '',
  list: [],
  status: Fetching
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_PROSPECT_NOTES_STATUS:
      return {
        ...state,
        status: action.status
      };
    case POPULATE_PROSPECT_NOTES:
      const { results, ...rest } = action.data!;
      return {
        ...rest,
        list: results,
        status: Success
      };
    case ADD_PROSPECT_NOTE:
      return {
        ...state,
        list: [action.note, ...state.list!],
        status: Success
      };
    case EDIT_PROSPECT_NOTE:
      const updatedList = state.list!.map(item => {
        if (item.id === action.note!.id) {
          return { ...action.note!, text: action.note!.text };
        }
        return item;
      });
      return {
        ...state,
        list: updatedList,
        status: Success
      };
    case DELETE_PROSPECT_NOTE:
      const filteredList = state.list!.filter(item => item.id !== action.note!.id);
      return {
        ...state,
        list: filteredList,
        status: Success
      };
    case RESTORE_PROSPECT_NOTE:
      const newList = [...state.list!];
      newList.splice(action.index!, 0, action.note!);
      return {
        ...state,
        list: newList,
        status: Success
      };
    case SET_PROSPECT_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
