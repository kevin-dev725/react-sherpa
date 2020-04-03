import { createAction } from '../../redux-helpers';
import {
  FETCH_PROSPECTS,
  FETCH_PROSPECTS_FAILURE,
  FETCH_PROSPECTS_SUCCESS,
  UPDATE_PROSPECT_LIST,
  FETCH_PROSPECT,
  FETCH_PROSPECT_FAILURE,
  FETCH_PROSPECT_SUCCESS,
  UPDATE_PROSPECT,
  UPDATE_PROSPECT_FAILURE,
  UPDATE_PROSPECT_SUCCESS,
  DELETE_PROSPECT,
  DELETE_PROSPECT_FAILURE,
  DELETE_PROSPECT_SUCCESS,
  RESET_PROSPECTS,
  FETCH_PROSPECT_NEXT_PAGE
} from './actionTypes';

// fetching
export const fetchProspects = createAction(FETCH_PROSPECTS);
export const fetchProspectsSuccess = createAction(FETCH_PROSPECTS_SUCCESS);
export const fetchProspectsFailure = createAction(FETCH_PROSPECTS_FAILURE);

// updating prospect-list by concatenation
export const updateProspectList = createAction(UPDATE_PROSPECT_LIST);

// fetch individual prospect
export const fetchProspect = createAction(FETCH_PROSPECT)
export const fetchProspectFailure = createAction(FETCH_PROSPECT_FAILURE);
export const fetchProspectSuccess = createAction(FETCH_PROSPECT_SUCCESS);

// update individual prospect
export const updateProspect = createAction(UPDATE_PROSPECT);
export const updateProspectSuccess = createAction(UPDATE_PROSPECT_SUCCESS);
export const updateProspectFailure = createAction(UPDATE_PROSPECT_FAILURE);

// delete
export const deleteProspect = createAction(DELETE_PROSPECT);
export const deleteProspectSuccess = createAction(DELETE_PROSPECT_SUCCESS);
export const deleteProspectFailure = createAction(DELETE_PROSPECT_FAILURE);

// reset prospect action
export const resetProspects = createAction(RESET_PROSPECTS);

// fetching next pages
export const fetchProspectNextPage = createAction(FETCH_PROSPECT_NEXT_PAGE);
