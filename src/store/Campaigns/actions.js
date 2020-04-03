import {
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  FETCH_CAMPAIGNS,
  ARCHIVE_CAMPAIGN,
  UPDATE_SMS_TEMPLATE,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE,
  UPDATE_CAMPAIGN_LIST,
  FETCH_CAMPAIGN_NEXT_PAGE,
  RESET_CAMPAIGNS_DATA,
  UNARCHIVE_CAMPAIGN,
  PAGINATE_CAMPAIGN_LIST
} from './actionTypes';
import { createAction } from '../../redux-helpers';

/*************************************************************************************************/

export const fetchCampaignNextPage = createAction(FETCH_CAMPAIGN_NEXT_PAGE);

export const updateCampaignList = createAction(UPDATE_CAMPAIGN_LIST);

export const paginateCampaignList = createAction(PAGINATE_CAMPAIGN_LIST);

export const setFetchedCampaignStatus = createAction(FETCH_CAMPAIGNS);

export const setFetchedCampaigns = createAction(SET_FETCH_CAMPAIGNS);

export const setFetchedCampaignsError = createAction(SET_FETCH_CAMPAIGNS_ERROR);

export const resetCampaignsData = createAction(RESET_CAMPAIGNS_DATA);

export const setArchiveCampaign = createAction(ARCHIVE_CAMPAIGN);

export const setUnArchiveCampaign = createAction(UNARCHIVE_CAMPAIGN);

export const setUpdatedSmsTemplateCampaign = createAction(UPDATE_SMS_TEMPLATE);

export const setFetchCampaignsNextPage = createAction(SET_FETCH_CAMPAIGNS_NEXT_PAGE);

export const setFetchCampaignsNextPageSuccess = createAction(SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS);

