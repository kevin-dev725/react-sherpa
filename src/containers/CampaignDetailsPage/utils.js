import React from 'react';
import MainInfo from './MessagesTab/MainInfo';
import SubInfo from './MessagesTab/SubInfo';
import Title from './MessagesTab/Title';
import StatusWrapper from './MessagesTab/StatusWrapper';
import { IListItem } from '../../components/List/utils';
import store from '../../store/store';
import { prospectUpdate } from '../../store/prospectStore/thunks';
import { ProspectActions } from '../../helpers/variables';
import { getNewVerifiedStatus } from '../../components/StatusActionBtns';
import {
  setProspectActiveTab
} from '../../store/uiStore/prospectDetailsPageView/actions';
import {
  setProspectCyclePath, setActiveCampaign
} from '../../store/uiStore/prospectDetailsView/actions';

export const getBlockedReasonMessage = str => {
  switch(str) {
      case "time":
        return "Messaging disabled from 8:30pm to 8:30am in compliance with TCPA law";
      case "subscription":
        return "No active subscription";
      case "active-numbers":
        return "Not enough active numbers in this market"
      default:
        return null;
  }
}

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = opts => campaignProspect => {
  const {
    prospect: { id, name, leadStageTitle = 'Follow-Up', displayMessage },
    hasUnreadSms
  } = campaignProspect;

  // when we click on the item we want to navigate to the
  // prospect-details page Message Tab.
  // We need to dispatch an action to set the proper tab.
  const onClickItem = () => {
    // set the source of prospects to cycle through
    store.dispatch(setProspectCyclePath([
      ...opts.prospectPath,
      campaignProspect.campaign.id
    ]));

    // set the active campaign
    if (opts.setActiveCampaign) {
      store.dispatch(setActiveCampaign(campaignProspect.campaign.id))
    }

    // set the active tab for prospect-details
    store.dispatch(setProspectActiveTab('2'));
  };

  const prospectOnClickStatus = (attr, payload) => () => {
    return prospectUpdate(id, payload, store.dispatch);
  };

  const actions = ProspectActions.map(action => {
    const status = campaignProspect.prospect[action.attr];
    let payload = { [action.attr]: !status };
    let backgroundColor = campaignProspect.prospect[action.attr] ? action.background : 'grey';

    // special case for ownerVerifiedStatus
    if (action.attr === 'ownerVerifiedStatus') {
      payload[action.attr] = getNewVerifiedStatus(status);

      // here we set the background color to grey if it's not
      // verified
      if (status !== "verified") {
        backgroundColor = 'grey';
      }
    }


    return {
      ...action,
      status,
      link: prospectOnClickStatus(action.attr, payload),
      background: backgroundColor
    };
  });

  const { message = '', dt = '' } = displayMessage || {};

  return {
    ...IListItem,
    id,
    name: <Title name={name} isRead={!hasUnreadSms} />,
    subInfo: <SubInfo status={leadStageTitle} />,
    mainInfo: <MainInfo message={message} />,
    readable: true,
    isRead: !hasUnreadSms,
    statusWrapper: (
      <StatusWrapper
        dt={dt}
        link={{ pathname: `/prospect/${id}/details`, state: { backButtonText: opts.backButtonText } }}
        onClick={onClickItem}
      />),
    actions: actions
  };
};

// uses a higher-order function for re-usability
export const prospectsToItemList = opts => prospects => prospects.map(prospectToItemList(opts));
