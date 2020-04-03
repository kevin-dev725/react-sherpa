import { campaignProspectList, campaignProspectListNextPage } from './api';
import {
  fetchCampaignProspects,
  fetchCampaignProspectsFailure,
  fetchCampaignProspectsSuccess,
  fetchMoreCampaignProspects
} from './actions';
import { updateProspectList } from '../prospectStore/actions';
import { trimProspectsAndMessages } from './transformers';
import { arrayToMapIndex } from '../utils';
import { populateProspectMessages } from '../ProspectDetails/messages/actions';

const shouldFetch = (campaign: any, force: boolean) => {
  return !campaign || campaign.length === 0 || force;
}

export const campaignProspectSearch = (campaignId: number, options: any) => (
  dispatch: any,
  getState: any
) => {
  const { force = false, page = null, filter, concatResults = false } = options;

  let apiParams = '';
  const {
    campaignProspectStore: { campaignProspects = {} }
  } = getState();

  // Fetch if 'forced' or if don't have anything
  if (shouldFetch(campaignProspects[campaignId], force)) {
    // construct filter
    if (filter) {
      apiParams = `&${filter.name}=${filter.value}`;
    }

    // check if page is set
    if (page) {
      apiParams += `&page${page}`;
    }

    dispatch(fetchCampaignProspects(true));
    return campaignProspectList(campaignId, apiParams)
      .then(({ data }) => {
        const [prospects, campaignProspects, messages] = trimProspectsAndMessages(data.results);
        dispatch(
          fetchCampaignProspectsSuccess({
            ...data,
            concatResults,
            results: { [campaignId]: campaignProspects }
          })
        );
        dispatch(updateProspectList({
          results: arrayToMapIndex('id', prospects),
          next: null,
          previous: null
        }));
        dispatch(populateProspectMessages(messages));
      })
      .catch((_: any) => {
        dispatch(fetchCampaignProspectsFailure(true));
      });
  }
};

export const campaignProspectsNextPage = (campaignId: number) => (dispatch: any, getState: any) => {
  const {
    campaignProspectStore: { next = null, isLoadingMore, campaignProspects }
  } = getState();
  const existingCampaignProspects = campaignProspects[campaignId];

  if (next && !isLoadingMore) {
    dispatch(fetchMoreCampaignProspects(true));
    return campaignProspectListNextPage(next)
      .then(({ data }) => {
        const [prospects, campaignProspects, messages] = trimProspectsAndMessages(data.results);
        dispatch(
          fetchCampaignProspectsSuccess({
            ...data,
            concatResults: true,
            results: {
              [campaignId]: [...existingCampaignProspects, ...campaignProspects]
            }
          })
        );
        dispatch(updateProspectList({
          results: arrayToMapIndex('id', prospects),
          next: null,
          previous: null
        }));
        dispatch(populateProspectMessages(messages));
      })
      .catch(error => console.log('ERROR', error.response));
  }
};
