import {
  FETCH_CAMPAIGN_STATS,
  FETCH_CAMPAIGN_STATS_SUCCESS,
  FETCH_CAMPAIGN_STATS_ERROR
} from './actionTypes';
import { createAction } from '../../redux-helpers';

export const fetchCampaignStats = createAction(FETCH_CAMPAIGN_STATS);
export const fetchCampaignStatsSuccess = createAction(FETCH_CAMPAIGN_STATS_SUCCESS);
export const fetchCampaignStatsError = createAction(FETCH_CAMPAIGN_STATS_ERROR);
