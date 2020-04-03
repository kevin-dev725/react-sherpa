import { createAction } from '../../../redux-helpers';
import {
  SET_ACTIVE_CAMPAIGN,
  SET_ACTION_BTN_STATUS,
  SET_ACTIVE_PROSPECT,
  CLEAR_ACTIVE_CAMPAIGN,
  SET_PROSPECT_CYCLE_SOURCE_PATH,
  CLEAR_PROSPECT_CYCLE_SOURCE_PATH
} from './actionTypes';

export const setActiveCampaign = createAction(SET_ACTIVE_CAMPAIGN);
export const setActionBtnStatus = createAction(SET_ACTION_BTN_STATUS);
export const setActiveProspect = createAction(SET_ACTIVE_PROSPECT);
export const clearActiveCampaign = createAction(CLEAR_ACTIVE_CAMPAIGN);

// cycle functionality
export const setProspectCyclePath = createAction(SET_PROSPECT_CYCLE_SOURCE_PATH);
export const clearProspectCyclePath = createAction(CLEAR_PROSPECT_CYCLE_SOURCE_PATH);
