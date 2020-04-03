import {
  POPULATE_SMS_TEMPLATES,
  SET_SMS_TEMPLATES_STATUS,
  SET_SMS_TEMPLATES_ERROR,
  POPULATE_QUICK_REPLIES
} from './actionTypes';
import AxiosInstance from '../../axiosConfig';
import { Fetching } from '../../helpers/variables';
import { Dispatch } from 'redux';
import { arrayToMapIndex } from '../utils';

export interface ITemplate {
  company: number;
  message: string;
  isActive: boolean;
  templateName: string;
  alternateMessage: string;
}

export const populateSmsTemplates = (templates: ITemplate[]) => ({
  type: POPULATE_SMS_TEMPLATES,
  templates
});

export const setSmsTemplatesStatus = (status: string) => ({
  type: SET_SMS_TEMPLATES_STATUS,
  status
});

export const setSmsTemplatesError = (error: string) => ({
  type: SET_SMS_TEMPLATES_ERROR,
  error
});

export const populateQuickReplies = (quickReplies: any[]) => ({
  type: POPULATE_QUICK_REPLIES,
  quickReplies
})

const handleError = (message: string, error: string, dispatch: Dispatch) => {
  console.log(message, error);
  dispatch(setSmsTemplatesError(error));
};

export const fetchSmsTemplates = () => (dispatch: Dispatch) => {
  dispatch(setSmsTemplatesStatus(Fetching));

  AxiosInstance.get('/sms-templates/')
    .then(({ data }) => {
      const smsMap = arrayToMapIndex('id', data);
      dispatch(populateSmsTemplates(smsMap));
    })
    .catch((error: any) => handleError(`campaign-notes GET error `, error, dispatch));
};

export const fetchQuickReplies = (id: number) => (dispatch: Dispatch) => {
  dispatch(setSmsTemplatesStatus(Fetching));
  AxiosInstance.get(`/prospects/${id}/quick_replies/`)
    .then(({ data }) => {
      dispatch(populateQuickReplies(data));
    })
    .catch((error: any) => handleError(`quick-replies GET error `, error, dispatch));
};
