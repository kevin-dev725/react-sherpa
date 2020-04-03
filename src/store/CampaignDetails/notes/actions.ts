import {
  POPULATE_CAMPAIGN_NOTES,
  SET_CAMPAIGN_NOTE_ERROR,
  SET_CAMPAIGN_NOTES_STATUS,
  RESTORE_CAMPAIGN_NOTE,
  ADD_CAMPAIGN_NOTE,
  EDIT_CAMPAIGN_NOTE,
  DELETE_CAMPAIGN_NOTE
} from './actionTypes';
import AxiosInstance, { delayedRequest } from '../../../axiosConfig';
import { Dispatch } from 'redux';
import { Fetching, generalNetworkError, fastSpinner } from '../../../helpers/variables';
import { addNewToast } from '../../Toasts/actions';

export interface INote {
  id?: number;
  createdDate?: string;
  text: string;
  campaign: number;
  createdBy: number;
}

export interface IResults {
  count: number;
  next: null;
  previous: null;
  results?: INote[];
}

export const populateCampaignNotes = (data: IResults) => ({
  type: POPULATE_CAMPAIGN_NOTES,
  data
});

export const restoreCampaignNote = (note: INote, index: number) => ({
  type: RESTORE_CAMPAIGN_NOTE,
  note,
  index
});

export const addCampaignNote = (note: INote) => ({
  type: ADD_CAMPAIGN_NOTE,
  note
});

export const editCampaignNote = (note: INote) => ({
  type: EDIT_CAMPAIGN_NOTE,
  note
});

export const deleteCampaignNote = (note: INote) => ({
  type: DELETE_CAMPAIGN_NOTE,
  note
});

export const setCampaignNotesError = (error: string) => ({
  type: SET_CAMPAIGN_NOTE_ERROR,
  error
});

export const setCampaignNotesStatus = (status: string) => ({
  type: SET_CAMPAIGN_NOTES_STATUS,
  status
});

export interface IAxiosConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: INote;
}

const handleError = (message: string, error: string, dispatch: any) => {
  console.log(message, error);
  dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  dispatch(setCampaignNotesError(error));
};

export const fetchCampaignNotes = (id: number) => (dispatch: Dispatch) => {
  const params = { expand: 'created_by', campaign: id };
  dispatch(setCampaignNotesStatus(Fetching));
  delayedRequest(AxiosInstance.get('/campaign-notes/', { params }), fastSpinner)
    .then(({ data }: any) => dispatch(populateCampaignNotes(data)))
    .catch((error: any) => handleError(`campaign-notes GET error `, error, dispatch));
};

interface IData {
  data: IResults;
}

export const updateCampaignNotes = (config: IAxiosConfig, successCB?: Function, failCB?: Function) => (
  dispatch: Dispatch
) => {
  //if adding note, set note status to "Fetching"
  successCB && dispatch(setCampaignNotesStatus(Fetching));
  const fetchConfig = { ...config, url: `/campaign-notes${config.url}` };
  return delayedRequest(AxiosInstance(fetchConfig), fastSpinner)
    .then(({ data }: IData) => {
      successCB && successCB(data);
    })
    .catch((error: string) => {
      failCB && failCB();
      handleError(`campaign-notes ${config.method} error `, error, dispatch);
    });
};
