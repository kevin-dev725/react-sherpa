import React from 'react';
import SubInfo from './SubInfo';
import { StyledIcon } from '../../components/List/IconHolster';
import { IListItem } from '../../components/List/utils';
import StatusWrapper from './StatusWrapper';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const campaignFolderToItemList = ({ id, name, campaignCount }) => {
  return {
    ...IListItem,
    id,
    name,
    subInfo: <SubInfo data={{ campaignCount }} />,
    readable: true,
    isRead: true,
    icon: <StyledIcon margin='mb-1' name={'folder'} />,
    statusWrapper: <StatusWrapper link={`/markets/${id}/campaigns`} />
  };
};

export const campaignFoldersToItemList = campaigns => campaigns.map(campaignFolderToItemList);
