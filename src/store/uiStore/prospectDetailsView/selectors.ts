import { profilesToAgents } from './transformers';
import { path as detailsViewPath } from './reducer';
import { path as authPath } from '../../Auth/reducers';
import {
  createSelectorContext,
  createSelector as createSelector2
} from '../../../redux-helpers';
import { getIn } from '../../../utils';

const createSelector = createSelectorContext(detailsViewPath);

export const activeProspectSelector = createSelector('activeProspect');
export const activeCampaignSelector = createSelector('activeCampaign');
export const actionBtnStatusSelector = createSelector('actionButtons');
export const agentSelector = createSelector2(
  [...authPath, 'userData', 'company', 'profiles'],
  profilesToAgents
);
export const activeCampaign = createSelector('activeCampaign');
export const getProspectsToCycle = createSelector(
  'prospectSourcePath',
  (prospectSourcePath: any, state: any) => {
    if (prospectSourcePath.length > 0) {
      const data = getIn(prospectSourcePath, state) || [];
      return data.map((campaignProspect: any) => campaignProspect.prospect);
    }

    return [];
  }
);
