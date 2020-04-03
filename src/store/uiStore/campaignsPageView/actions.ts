import { createAction } from '../../../redux-helpers';
import { SET_CAMPAIGN_FILTER, RESET_CAMPAIGN_FILTER } from './actionTypes';

export const setCampaignFilter = createAction(SET_CAMPAIGN_FILTER);
export const resetCampaignFilter = createAction(RESET_CAMPAIGN_FILTER);

