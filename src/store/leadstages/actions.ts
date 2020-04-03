import {
  FETCH_LEADSTAGES,
  FETCH_LEADSTAGES_SUCCESS,
  FETCH_LEADSTAGES_FAILURE
} from './actionTypes';
import { createAction } from '../../redux-helpers';

export const fetchLeadStages = createAction(FETCH_LEADSTAGES);
export const fetchLeadStagesSuccess = createAction(FETCH_LEADSTAGES_SUCCESS);
export const fetchLeadStagesFailure = createAction(FETCH_LEADSTAGES_FAILURE);
