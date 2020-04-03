export const removeCampaignProsectUnread = (campaignProspectsUnread: any, prospectToRemove: any) => {
  return Object.keys(campaignProspectsUnread)
    .reduce((acc: any, key: any) => {
      const groupedCampaignProspects = campaignProspectsUnread[key];
      const filteredList = groupedCampaignProspects.filter(
        (cp: any) => cp.prospect !== prospectToRemove
      ) || [];
      acc[key] = filteredList;

      return acc
    }, {});
}
