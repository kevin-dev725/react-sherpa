import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import MessagesTab from '../../../components/messageTab/MessageTab';
import ProspectCard from './ProspectCard';
import { useSelector } from 'react-redux';
import { uiGetActiveProspect } from '../../../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/selectors';
import { prospectMessagesList } from '../../../store/ProspectDetails/messages/selectors';
import { getCampaignProspectsUnread } from '../../../store/campaignProspectStore/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';

const Wrapper = styled.div`
  padding: 0;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MessageDetail = props => {
  const [subjectId, setSubjectId] = useState(0);
  const active_prospect = useSelector(uiGetActiveProspect);
  const prospect_messages = useSelector(prospectMessagesList(subjectId));
  const unreadMessages = useSelector(getCampaignProspectsUnread);
  const prospect = useSelector(getProspect(subjectId));

  useEffect(() => {
    setSubjectId(active_prospect || (unreadMessages[0] && unreadMessages[0][0] && unreadMessages[0][0].id));
  }, [unreadMessages, active_prospect])

  return (
    <Wrapper>
      <ProspectCard
        data-test='prospect-card'
        prospect={prospect}
      />
      <MessagesTab
        data-test='desktop-campaign-prospect-messages'
        messages={prospect_messages}
        subjectId={subjectId}
        scrollToBot={true}
        showInitials={true}
        isDesktop={true}
      />
    </Wrapper>
  );
};

export default MessageDetail;
