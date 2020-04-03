import {
  FETCH_CAMPAIGN_STATS,
  FETCH_CAMPAIGN_STATS_SUCCESS,
  FETCH_CAMPAIGN_STATS_ERROR
} from './actionTypes';

const initialState: any = {
  stats: {},
  loading: false,
  error: false
};

export const path = ['CampaignStatsStore'];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case FETCH_CAMPAIGN_STATS: {
      return {
        ...state,
        loading: action.payload
      };
    }
    case FETCH_CAMPAIGN_STATS_SUCCESS: {
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };
    }
    case FETCH_CAMPAIGN_STATS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
