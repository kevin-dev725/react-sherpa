import {
  FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR
} from './actionTypes';
import { Fetching, Success, FetchError } from '../../helpers/variables';

export const initialState = {
  campaignsBatchProspects: [],
  error: '',
  next: '',
  previous: '',
  count: 0,
  status: Fetching
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS_BATCH_PROSPECTS:
      return {
        ...state,
        status: Fetching
      };
    case SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS:
      return {
        ...state,
        campaignsBatchProspects: action.data,
        status: Success
      };
    case SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR:
      return {
        ...state,
        error: action.error,
        status: FetchError
      };
    default:
      return state;
  }
}
