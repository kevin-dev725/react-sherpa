import { createAction } from '../../../redux-helpers';
import { SET_CAMPAIGN_ACTIVE_TAB, RESET_CAMPAIGN_ACTIVE_TAB } from './actionTypes';

export const setCampaignActiveTab = createAction(SET_CAMPAIGN_ACTIVE_TAB);
export const resetCampaignActiveTab = createAction(RESET_CAMPAIGN_ACTIVE_TAB);
