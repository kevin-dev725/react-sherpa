import { ProspectRecord } from '../prospectStore/interfaces';
import { arrayToMapIndex } from '../utils';


export const trimProspectsAndMessages = (campaignProspects: any) => {
  return campaignProspects
    .reduce((campaignAndProspects: any, campaignProspect: any) => {
      const prospect = campaignProspect.prospect;
      campaignAndProspects[2][prospect.id] = arrayToMapIndex('id', prospect.messages);
      prospect.messages = [];
      campaignAndProspects[0].push(ProspectRecord(prospect, false));
      // replace prospect with just the id
      campaignProspect.prospect = prospect.id

      // collect the campaignProspect
      campaignAndProspects[1].push(campaignProspect);

      return campaignAndProspects;
    }, [[], [], {}]);
};
