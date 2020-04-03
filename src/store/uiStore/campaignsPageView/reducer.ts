import { SET_CAMPAIGN_FILTER, RESET_CAMPAIGN_FILTER  } from './actionTypes';

const initialState = {
  activeFilter: []
}

export const path = ['uiStore', 'campaignsPageView'];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_CAMPAIGN_FILTER:
      return {
        ...state,
        activeFilter: [action.payload]
      };
    case RESET_CAMPAIGN_FILTER:
      return initialState;
    default:
      return state;
  }
}
