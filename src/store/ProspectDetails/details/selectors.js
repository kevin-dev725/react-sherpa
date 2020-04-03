import { profilesToAgents } from './transformers';
import { prospectDetailsReducer } from '../../../helpers/variables';

const reducer = prospectDetailsReducer;

export const prospectDetailsData = ({ [reducer]: { prospectDetails } }) => prospectDetails.prospect;
export const prospectDetails = ({ [reducer]: { prospectDetails } }) => ({
  prospectId: prospectDetails.prospect.id,
  reminderDateLocal: prospectDetails.prospect.reminderDateLocal,
  sherpaPhoneNumber: prospectDetails.prospect.sherpaPhoneNumber,
  emailedToPodio: prospectDetails.prospect.emailedToPodio,
  pushedToZapier: prospectDetails.prospect.pushedToZapier,
  smsRelayMap: prospectDetails.smsRelayMap,
  zillowLink: prospectDetails.prospect.zillowLink || ""
});
export const prospectDetailUpdateStatus = ({ [reducer]: { prospectDetails } }) =>
  prospectDetails.actionBtnStatus;
export const prospectDetailsStatus = ({ [reducer]: { prospectDetails } }) => prospectDetails.status;
export const prospectDetailsCampaigns = ({ [reducer]: { prospectDetails } }) =>
  prospectDetails.prospectCampaigns;
export const prospectDetailsAgent = ({ [reducer]: { prospectDetails } }) =>
  prospectDetails.prospect.smsRelayMap;

// details tab selectors
export const agentSelector = state => {
  let {
    auth: {
      userData: {
        company: { profiles }
      }
    }
  } = state;

  return profilesToAgents(profiles);
};
export const selectedAgent = ({ [reducer]: { prospectDetails } }) => prospectDetails.prospect.agent;
export const activeCampaignSelector = ({ [reducer]: { prospectDetails } }) => {
  const { prospectCampaigns = [], activeCampaign } = prospectDetails;
  let campaign = {};

  // return empty object if nothing found
  if (activeCampaign) {
    campaign = prospectCampaigns.find(campaign_t => campaign_t.id === activeCampaign) || {};
  }

  return campaign;
};
// selectors for the action btns
export const prospectBtnStatus = ({ [reducer]: { prospectDetails } }) =>
  prospectDetails.prospectDetailsTab.prospectStatus;
