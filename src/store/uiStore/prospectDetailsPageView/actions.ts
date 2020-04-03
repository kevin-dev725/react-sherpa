import { createAction } from '../../../redux-helpers';
import {
  SET_PROSPECT_ACTIVE_TAB,
  RESET_PROSPECT_ACTIVE_TAB
} from './actionTypes';

export const setProspectActiveTab = createAction(SET_PROSPECT_ACTIVE_TAB);
export const resetProspectActiveTab = createAction(RESET_PROSPECT_ACTIVE_TAB);
