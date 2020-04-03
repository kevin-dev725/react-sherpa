import { createAction } from '../../../redux-helpers';

export const searchProspects = createAction('SEARCH_PROSPECTS');
export const searchProspectsSuccess = createAction('SEARCH_PROSPECTS_SUCCESS');
export const searchProspectsFailure = createAction('SEARCH_PROSPECTS_FAILURE');

export const searchProspectsNextPage = createAction('SEARCH_PROSPECTS_NEXT_PAGE')

export const searchProspectsNextPageSuccess = createAction('SEARCH_PROSPECTS_NEXT_PAGE_SUCCESS')
export const searchResetResults = createAction('SEARCH_RESET_RESULTS');

export const setSearchProspectIds = createAction('SET_SEARCH_PROSPECT_IDS');
