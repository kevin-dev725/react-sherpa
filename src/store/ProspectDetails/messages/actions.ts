import {
  FETCH_PROSPECT_MESSAGES_LIST_SUCCESS,
  FETCH_PROSPECT_MESSAGES_LIST_ERROR,
  SET_PROSPECT_MESSAGES_LIST_STATUS,
  UPDATE_PROSPECT_MESSAGE,
  UPDATE_PROSPECT_MESSAGES
} from './actionTypes';
import axiosInstance, { delayedRequest } from '../../../axiosConfig';
import { Dispatch } from 'redux';
import { Fetching, fastSpinner, generalNetworkError } from '../../../helpers/variables';
import { addNewToast } from '../../Toasts/actions';
import { createAction } from '../../../redux-helpers';

export interface IMessage {
  prospect: number;
  message: string;
  fromNumber: string;
  dt: string;
  fromProspect: boolean;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: IMessage[];
}

export const populateProspectMessages = createAction(FETCH_PROSPECT_MESSAGES_LIST_SUCCESS);
export const setProspectMessagesError = createAction(FETCH_PROSPECT_MESSAGES_LIST_ERROR);
export const setProspectMessagesStatus = createAction(SET_PROSPECT_MESSAGES_LIST_STATUS);
export const updateProspectMessage = createAction(UPDATE_PROSPECT_MESSAGE);
export const updateProspectMessages = createAction(UPDATE_PROSPECT_MESSAGES)
