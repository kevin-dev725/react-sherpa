import {
  SET_PROSPECT_ACTIVE_TAB,
  RESET_PROSPECT_ACTIVE_TAB
} from './actionTypes';

const initial_state = {
  activeTab: '1'
};

export const path = ['uiStore', 'prospectDetailsPageView']

export default function reducer(state: any = initial_state, action: any) {
  switch (action.type) {
    case SET_PROSPECT_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case RESET_PROSPECT_ACTIVE_TAB:
      return initial_state;
    default:
      return state
  }
};
