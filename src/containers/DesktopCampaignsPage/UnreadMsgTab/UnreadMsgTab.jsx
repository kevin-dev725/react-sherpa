import React, { useEffect } from 'react';
import styled from 'styled-components';

import { NoResults } from '../../../components/LoadingData';
import MessagesList from './MessagesList';
import MessageDetail from './MessageDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getCampaignProspectsUnreadCount, getCampaignProspectsUnread } from '../../../store/campaignProspectStore/selectors';
import { setActiveCampaignProspect } from '../../../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/actions';
import usePrevious from '../../../hooks/usePrevious';

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  & > div {
    flex-basis: 50%;
    overflow: hidden;
  }
`;

function UnreadMsgTab() {
  const unreadMessages = useSelector(getCampaignProspectsUnreadCount);
  const campaignProspectsUnread = useSelector(getCampaignProspectsUnread);
  const dispatch = useDispatch();
  const prevUnread = usePrevious(unreadMessages);

  useEffect(() => {
    if (unreadMessages.length && prevUnread.length && prevUnread[0] && unreadMessages[0] && prevUnread[0].id && prevUnread[0].id !== unreadMessages[0].id) {
      console.log('testing 123')
      dispatch(setActiveCampaignProspect(campaignProspectsUnread[0].id))
    }
  });

  return unreadMessages ?
      <Wrapper data-test='unread-messages-tab'>
        <MessagesList />
        <MessageDetail />
      </Wrapper>
      :
      <NoResults><p>There are no unread messages at this time.</p></NoResults>
};

export default UnreadMsgTab;
