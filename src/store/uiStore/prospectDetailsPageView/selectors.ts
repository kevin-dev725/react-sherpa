import { createSelectorContext } from '../../../redux-helpers';
import { path } from './reducer';

const createSelector = createSelectorContext(path);

export const activeTab = createSelector('activeTab');
