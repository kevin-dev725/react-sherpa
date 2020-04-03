import React from 'react';
import SubInfo from './SubInfo';
import { IListItem } from '../../components/List/utils';
import { archiveCampaign } from '../../store/Campaigns/thunks';
import StatusWrapper from './StatusWrapper';
import { setCampaignActiveTab } from '../../store/uiStore/campaignDetailsPageView/actions';
import store from '../../store/store';
/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
export const campaignToItemList = campaign => {
  const { id, market, name, priorityCount, totalLeads, hasUnreadSMS } = campaign;

  const onClickItem = () => store.dispatch(setCampaignActiveTab('1'))

  return {
    ...IListItem,
    id,
    name,
    subInfo: <SubInfo data={{ priorityCount, totalLeads }} />,
    readable: true,
    isRead: !hasUnreadSMS,
    statusWrapper: (
      <StatusWrapper
        link={`/markets/${market}/campaigns/${id}/details`}
        onClick={onClickItem}
      />),
    actions: [
      {
        icon: 'archive',
        name: 'Archive',
        link: archiveCampaign({ ...campaign, isArchived: !campaign.isArchived }),
        background: 'gray'
      }
    ]
  };
};

export const campaignsToItemList = campaigns => campaigns.map(campaignToItemList);
