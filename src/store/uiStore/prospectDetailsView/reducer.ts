import {
  SET_ACTIVE_CAMPAIGN,
  SET_ACTION_BTN_STATUS,
  SET_ACTIVE_PROSPECT,
  CLEAR_ACTIVE_CAMPAIGN,
  SET_PROSPECT_CYCLE_SOURCE_PATH,
  CLEAR_PROSPECT_CYCLE_SOURCE_PATH
} from './actionTypes';

const initialState = {
  isLoading: true,
  activeProspect: null,
  activeCampaign: null,
  prospectSourcePath: [],
  actionButtons: {
    ownerVerifiedStatus: false,
    doNotCall: false,
    isPriority: false,
    isQualifiedLead: false
  }
}

export const path = ['uiStore', 'prospectDetailsView'];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_ACTIVE_CAMPAIGN:
      return {
        ...state,
        activeCampaign: action.payload
      };
    case SET_ACTION_BTN_STATUS: {
      return {
        ...state,
        actionButtons: {
          ...state.actionButtons,
          [action.payload.btn]: action.payload.updating
        }
      };
    };
    case SET_ACTIVE_PROSPECT:
      return {
        ...state,
        activeProspect: action.payload
      };
    case CLEAR_ACTIVE_CAMPAIGN:
      return {
        ...state,
        activeCampaign: null
      };
    case SET_PROSPECT_CYCLE_SOURCE_PATH:
      return {
        ...state,
        prospectSourcePath: action.payload
      };
    case CLEAR_PROSPECT_CYCLE_SOURCE_PATH:
      return {
        ...state,
        prospectSourcePath: []
      }
    default:
      return state;
  }
}
