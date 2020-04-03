import { createAction } from '../../redux-helpers';
import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_LIST,
  UPDATE_CAMPAIGN_PROSPECT,
  UPDATE_CAMPAIGN_PROSPECT_SUCCESS,
  UPDATE_CAMPAIGN_PROSPECT_FAILURE,
  FETCH_MORE_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_UNREAD_SUCCESS,
  UPDATE_CAMPAIGN_PROSPECTS_UNREAD,
  REMOVE_CAMPAIGN_PROSPECT_UNREAD
} from './actionTypes';

// fetching batch
export const fetchCampaignProspects = createAction(FETCH_CAMPAIGN_PROSPECTS);
export const fetchCampaignProspectsSuccess = createAction(FETCH_CAMPAIGN_PROSPECTS_SUCCESS);
export const fetchCampaignProspectsFailure = createAction(FETCH_CAMPAIGN_PROSPECTS_FAILURE);

// update the list
export const updateCampaignProspects = createAction(UPDATE_CAMPAIGN_PROSPECT_LIST);
export const fetchMoreCampaignProspects = createAction(FETCH_MORE_CAMPAIGN_PROSPECTS);

// update campaign prospect individually
export const updateCampaignProspect = createAction(UPDATE_CAMPAIGN_PROSPECT);
export const updateCampaignProspectSuccess = createAction(UPDATE_CAMPAIGN_PROSPECT_SUCCESS);
export const updateCampaignProspectFailure = createAction(UPDATE_CAMPAIGN_PROSPECT_FAILURE);

// campaign prospects-unread
export const fetchCampaignProspectsUnread = createAction(FETCH_CAMPAIGN_PROSPECTS_UNREAD_SUCCESS);

// update single campaign-prospect-unread
export const updateCampaignProspectsUnread = createAction(UPDATE_CAMPAIGN_PROSPECTS_UNREAD);

// DELETE
export const removeCampaignProspect = createAction(REMOVE_CAMPAIGN_PROSPECT_UNREAD);
