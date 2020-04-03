import {
  SET_CAMPAIGN_PROSPECT_FILTER
} from './actionTypes';

const initialState = {
  filter: 0
};

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_CAMPAIGN_PROSPECT_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
