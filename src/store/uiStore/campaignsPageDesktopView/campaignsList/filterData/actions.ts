import {
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB,
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT,
  SET_CAMPAIGN_DESKTOP_TAB_DATA,
  RESET_CAMPAIGN_LIST_FILTER_TABS,
  SET_ACTIVE_CAMPAIGN_PROSPECT
} from './actionTypes';

import {
  createAction
} from '../../../../../redux-helpers';

export const setCampaignPageActiveTab = createAction(SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB);
export const setCampaignPageActiveSort = createAction(SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT);
export const setCampaignPageTabData = createAction(SET_CAMPAIGN_DESKTOP_TAB_DATA);
export const resetCampaignListTabs = createAction(RESET_CAMPAIGN_LIST_FILTER_TABS);
export const setActiveCampaignProspect = createAction(SET_ACTIVE_CAMPAIGN_PROSPECT);
