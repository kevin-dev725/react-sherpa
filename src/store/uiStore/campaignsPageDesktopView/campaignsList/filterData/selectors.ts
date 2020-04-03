import {
  createSelectorContext
} from '../../../../../redux-helpers';
import { path } from './reducer';
import { getIn } from '../../../../../utils';

const createSelector = createSelectorContext(path);

export const uiGetCampaignPageActiveTab = createSelector('activeTab');
export const uiGetCampaignPageActiveSort = createSelector('activeSort');

export const uiGetCampaigns = (state: any) => {
  const { campaigns: { campaigns = {} } } = state;
  const activeTab = uiGetCampaignPageActiveTab(state);
  const {
    sortOrder,
    sortedBy,
    nextPage,
    count
  } = getIn([...path, 'tabs', activeTab], state);
  let selectedCampaigns = sortOrder.map(
    (order: number) => campaigns[order]
  );

  // in case we're switching from campaign and data is not there
  // or wwas wiped out
  if (selectedCampaigns.some((campaign: any) => !campaign)) {
    selectedCampaigns = []
  }

  return { sortedBy, nextPage, campaigns: selectedCampaigns, count };
}

export const uiGetActiveProspect = createSelector('activeProspect');
