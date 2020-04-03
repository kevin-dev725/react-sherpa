import React from 'react';
import MainInfo from './MessagesTab/MainInfo';
import Indicator from './MessagesTab/Indicator';
import SubInfo from './MessagesTab/SubInfo';
import Title from './MessagesTab/Title';
import { IListItem } from '../../components/List/utils';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = (prospect) => {
  const {
    id, name = "hello", latestMessageReceived,
    hasUnreadSms, leadStageTitle } = prospect;

  const {
    message = "You have the wrong number",
    dt = "2019-12-02T21:08:27Z" } = latestMessageReceived || {};

  return {
    ...IListItem,
    name: <Title name={name} isRead={!hasUnreadSms}/>,
    subInfo: <SubInfo status={leadStageTitle}/>,
    mainInfo: <MainInfo message={message}/>,
    readable: true,
    isRead: !hasUnreadSms,
    link: `/campaigns/${id}/details`,
    indicator: <Indicator time={dt}/>,
    actions: [
      {
        icon: "verified",
        name: "Verified",
        link: "#",
        background: "green"
      },
      {
        icon: "dnc",
        name: "DNC",
        link: "#",
        background: "white"
      },
      {
        icon: "priority",
        name: "Priority",
        link: "#",
        background: "orange"
      },
      {
        icon: "qualified",
        name: "Qualified",
        link: "#",
        background: "purple"
      }
    ]
  };
}

export const prospectsToItemList = (prospects) => prospects.map(prospectToItemList);
