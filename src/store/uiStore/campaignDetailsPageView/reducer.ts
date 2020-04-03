import { SET_CAMPAIGN_ACTIVE_TAB, RESET_CAMPAIGN_ACTIVE_TAB } from './actionTypes';

const initialState = {
  activeTab: '1'
}

export const path = ['uiStore', 'campaignDetailsPageView'];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_CAMPAIGN_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case RESET_CAMPAIGN_ACTIVE_TAB:
      return initialState;
    default:
      return state;
  }
}
