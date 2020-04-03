import { path } from './reducer';
import { createSelectorContext } from '../../redux-helpers';
import { getLeadStages } from '../leadstages/selectors';
import { prospectsResults } from '../prospectStore/selectors';

const createSelector = createSelectorContext(path);

export const isLoadingMore = createSelector('isLoadingMore');
export const isLoading = createSelector('isLoading');
export const getCampaignProspects = (campaignId: any) => createSelector(
  'campaignProspects',
  (campaignProspectsMap: any, state: any) => {
    const leadStages = getLeadStages(state);
    const prospects = prospectsResults(state);
    const campaignProspects = campaignProspectsMap[campaignId] || [];

    if (Object.keys(prospects).length >= campaignProspects.length && leadStages.length > 0) {
      return campaignProspects.map((campaignProspect: any) => {
        const prospect = prospects[campaignProspect.prospect] || {};
        const leadStage = leadStages.find(
          (leadStage: any) => leadStage.id === prospect.leadStage
        );

        return {
          ...campaignProspect,
          prospect: {
            ...prospect,
            leadStageTitle: leadStage ? leadStage.leadStageTitle : ""
          }
        }
      })
    }

    return [];
  }
);
export const getCampaignProspectsUnread = createSelector(
  'campaignProspectsUnread',
  (campaignProspectsUnread: any, state: any) => {
    const leadStages = getLeadStages(state);
    const prospects = prospectsResults(state);

    if (Object.keys(campaignProspectsUnread).length > 0 || leadStages.length > 0) {
      const cps = Object.keys(campaignProspectsUnread).map((key: any) => {
        if (Object.keys(prospects).length >= campaignProspectsUnread[key].length) {
          return campaignProspectsUnread[key]
            .map((campaignProspect: any) => {
              const prospect = prospects[campaignProspect.prospect];
              const leadStage = leadStages.find(
                (leadStage: any) => leadStage.id === prospect.leadStage
              );

              return {
                ...campaignProspect,
                prospect: {
                  ...prospect,
                  leadStageTitle: leadStage ? leadStage.leadStageTitle : ''
                }
              }
            });
        }
        return [];
      });

      return cps.filter(cp => cp.length === 0).length > 0 ? [] : cps;
    }

    return [];
  }
);
export const getCampaignProspectsUnreadCount = createSelector('campaignProspectsUnreadCount');
