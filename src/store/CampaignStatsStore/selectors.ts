import { path } from './reducer';
import { createSelectorContext } from '../../redux-helpers';

const createSelector = createSelectorContext(path);
export const getCampaignStats = (id: number) => createSelector(
  'stats',
  (stats: any) => stats[id] || {}
);
