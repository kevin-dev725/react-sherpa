import AxiosInstance from '../../axiosConfig';
import {
  FETCH_MARKETS,
  SET_FETCH_MARKETS,
  SET_FETCH_MARKETS_ERROR,
  DECREMENT_MARKET_CAMPAIGN_COUNT
} from './actionTypes';
import { createMarketsFolders, formatCallForwardNumber } from './transformers';
import { history } from '../../history';
import { saveToLocalStorage } from './utils';
import { Fetching } from '../../helpers/variables';

export const setFetchMarketsStatus = status => ({
  type: FETCH_MARKETS,
  status
});

export const setFetchedMarkets = campaignFolders => ({
  type: SET_FETCH_MARKETS,
  campaignFolders
});

export const setFetchedMarketsError = error => ({
  type: SET_FETCH_MARKETS_ERROR,
  error
});

export const decrementMarketCampaignCount = market => ({
  type: DECREMENT_MARKET_CAMPAIGN_COUNT,
  market
});

export const updateMarket = market => ({
  type: 'UPDATE_MARKET',
  market
});

export const fetchMarkets = () => (dispatch, _) => {
  // NOTE: Needs to hit the Folder-endpoint in the future
  // For now we will render 1 folder called ALL that will contain all campaigns
  const handleError = (error, message) => {
    dispatch(setFetchedMarketsError(message));
  };

  dispatch(setFetchMarketsStatus(Fetching));

  return AxiosInstance.get('/markets/')
    .then(({ data }) => {
      const { results } = data;
      const marketFolders = createMarketsFolders(results);
      dispatch(setFetchedMarkets(marketFolders));

      return results;
    })
    .catch(error => {
      handleError(error, 'Error when fetching markets');
    });
};

export const updateMarketThunk = (id, params) => (dispatch) => {
  return AxiosInstance
    .patch(`/markets/${id}/`, params)
    .then(({ data }) => {
      dispatch(updateMarket(formatCallForwardNumber(data)));
      return data;
    });
};
