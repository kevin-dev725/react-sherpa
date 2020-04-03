import { createSelectorContext } from '../../redux-helpers';
import { path } from './reducers';

const createSelector = createSelectorContext(path);

export const getAllCampaigns = (state) => state.campaigns.campaigns || [];

export const campaignsList = (state) => {
    const { campaigns: { campaigns, sortOrder } } = state;

    return sortOrder.map((item) => campaigns[item]);
};

export const campaignsError = (state) => state.campaigns.error;
export const campaignsCount = (state) => state.campaigns.count;
export const campaignsStatus = (state) => state.campaigns.status;

export const campaignIsLoading = createSelector('isLoading');

export const activeMarket = (state) => state.campaigns.activeMarket;

export const getCampaign = (id) => (state) => state.campaigns.campaigns[id] || {};

export const sortByOrder = (state) => state.campaigns.sortBy;

export const campaignIsLoadingMore = (state) => state.campaigns.isLoadingMore;
