import React from 'react';
import { IListItem } from '../../../components/List/utils';
import { archiveCampaign } from '../../../store/Campaigns/actions';
/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
export const campaignToItemList = campaign => {
  const { id, name, createdBy, createdDate } = campaign;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getFormattedDateTime = (d) => {
    const date = new Date(d);
    const mon = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return mon + " " + day + ", " + year;
  };

  const date = getFormattedDateTime(createdDate);
  const subInfoStr = `By ${createdBy.fullName} ${date}`;
  return {
    ...IListItem,
    id,
    name,
    subInfo: subInfoStr,
    readable: true,
    isRead: false,
    actions: [
      {
        name: 'Export',
        link: archiveCampaign({ ...campaign, isArchived: !campaign.isArchived }),
      },
      {
        name: 'Rename',
        link: archiveCampaign({ ...campaign, isArchived: !campaign.isArchived }),
      },
      {
        name: 'Archive',
        link: archiveCampaign({ ...campaign, isArchived: !campaign.isArchived }),
      }
    ]
  };
};

export const campaignsToItemList = campaigns => campaigns.map(campaignToItemList);
