import { ProspectRecord } from './interfaces'
import { createSelectorContext } from '../../redux-helpers';
import { path } from './reducer';

const createSelector = createSelectorContext(path);

export const prospectsResults = createSelector('prospects');
export const propspectSearchResultsError = createSelector('error');
export const prospectNextPageUrl = createSelector('next');
export const prospectIsLoading = createSelector('isLoading');
export const prospectIsLoadingMore = createSelector('isLoadingMore');


// individual prospects
export const getProspect = (id: any) =>
  createSelector(
    'prospects',
    (prospects: any) => prospects[id] || ProspectRecord({}, false)
  );
