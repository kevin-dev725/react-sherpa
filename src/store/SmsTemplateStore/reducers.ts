import {
  POPULATE_SMS_TEMPLATES,
  SET_SMS_TEMPLATES_STATUS,
  SET_SMS_TEMPLATES_ERROR,
  POPULATE_QUICK_REPLIES
} from './actionTypes';
import { Fetching, FetchError, Success } from '../../helpers/variables';
import { ITemplate } from './actions';

interface IAction {
  type?: string;
  templates?: ITemplate[];
  status?: string;
  error?: string;
  quickReplies: any[];
}

const initialState: IAction = {
  templates: [],
  status: Fetching,
  error: '',
  quickReplies: []
};

export default function(state = initialState, action: IAction) {
  switch (action.type) {
    case POPULATE_SMS_TEMPLATES:
      return {
        ...state,
        templates: action.templates,
        status: Success
      };
    case SET_SMS_TEMPLATES_STATUS:
      return {
        ...state,
        status: action.status
      };
    case SET_SMS_TEMPLATES_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    case POPULATE_QUICK_REPLIES:
      return {
        ...state,
        quickReplies: action.quickReplies
      }
    default:
      return state;
  }
}
