import { createSelectorContext } from '../../../redux-helpers';
import { path } from './reducer';

const createSelector = createSelectorContext(path);
export const getActiveTab = createSelector('activeTab');
