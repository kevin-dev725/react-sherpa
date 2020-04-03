import { createSelectorContext } from '../../../redux-helpers';
import { path } from './reducer';

const createSelector = createSelectorContext(path);
export const getActiveFilter = createSelector('activeFilter');

export const getFilteredOwners = (state: any) => {
  return state.companyOwners.owners.filter((x:any) => x.id === state.uiStore.campaignsPageView.activeFilter[0]);
};
