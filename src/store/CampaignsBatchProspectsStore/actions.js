import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR,
  FETCH_CAMPAIGNS_BATCH_PROSPECTS
} from './actionTypes';
import { Fetching, generalNetworkError } from '../../helpers/variables';
import { addNewToast, emptyToastArray } from '../Toasts/actions';

export const setFetchedCampaignsBatchPropsectsStatus = status => ({
  type: FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  status
});

export const setFetchedCampaignsBatchProspects = data => ({
  type: SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS,
  data
});

export const setCampaignsBatchProspectsError = error => ({
  type: SET_FETCH_CAMPAIGNS_BATCH_PROSPECTS_ERROR,
  error
});

const handleError = (message, error, dispatch) => {
  console.log(message, error);
  dispatch(emptyToastArray());
  dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  dispatch(setCampaignsBatchProspectsError(error));
};

export const fetchCampaignsBatchProspects = id => (dispatch, _) => {
  dispatch(setFetchedCampaignsBatchPropsectsStatus(Fetching));

  AxiosInstance.get(`/campaigns/${id}/batch_prospects/`)
    .then(({ data }) => {
      const { results } = data;

      dispatch(setFetchedCampaignsBatchProspects(results));
    })
    .catch(error => {
      handleError('Error fetching campaign batch prospects: ', error, dispatch);
    });
};

export const sendInitialSmsMessage = data => (dispatch, _) => {
  const { id, phoneRaw, smsStatus, hasUnreadSms, campaign, prospect } = data;

  const postDataCampaign = {
    name: campaign.name,
    company: campaign.company,
    market: campaign.market,
    createdBy: campaign.createdBy,
    smsTemplateId: campaign.smsTemplate
  };

  const postDataProspect = {
    smsRelayMap: prospect.smsRelayMap
  };

  const postData = {
    campaigns: postDataCampaign,
    prospect: postDataProspect,
    smsTemplateId: campaign.smsTemplate,
    phoneRaw,
    smsStatus,
    hasUnreadSms
  };

  AxiosInstance.post(`/campaign-prospects/${id}/batch_send/`, postData)
    .then(data => {
      console.log('data sms sent: ', data);
    })
    .catch(error => {
      handleError('Error sending SMS message: ', error, dispatch);
    });
};
