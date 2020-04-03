import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';
import NameBubble from '../NameBubble';

const StyledListItem = styled.li`
  list-style: none;
  margin: 0;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: var(--pad4);

  &.unread {
    &:after {
      content: "New";
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      font-weight: 900;
      font-size: 0.7rem;
      transform: translate(0%, -57%);
      padding: 0.1em 0.8em 1.4em;
      line-height: 1.8;
      background: var(--sherpaBlue);
      z-index: -1;
      border-radius: 7px;
    }
  }

  .nameBubble {
    margin-bottom: calc(1.125rem + var(--pad1));
  }
`;

const MessageInfo = styled.div`
  flex-basis: 100%;
  margin-${props => props.fromProspect ? 'left' : 'right'}: var(--pad2);
`;

const StyledMessage = styled.div`
  background: ${props => (props.fromProspect ? 'white' : 'var(--sherpaBlue)')};
  border-radius: 0.8rem;
  border-bottom-right-radius: ${props => (!props.fromProspect ? 0 : '.8rem')};
  border-bottom-left-radius: ${props => (props.fromProspect ? 0 : '.8rem')};
  padding: var(--pad2) var(--pad4);
  color: ${props => (props.fromProspect ? 'black' : 'white')};
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: var(--pad1);
  white-space: break-spaces;
  hyphens: auto;
  border: 2px solid ${props => props.fromProspect ? 'white' : 'var(--sherpaBlue)'};
  border-color: ${props => props.unread ? "var(--sherpaBlue)" : null};

  @media (min-width: 768px) {
    background: ${props => (props.fromProspect ? 'var(--ghostBlue)' : 'var(--sherpaBlue)')};
    border: 2px solid ${props => props.fromProspect ? 'var(--ghostBlue)' : 'var(--sherpaBlue)'};
    border-color: ${props => props.unread ? "var(--sherpaBlue)" : null};
  }
`;

const TimeStamp = styled.time`
  display: flex;
  justify-content: ${props => (props.fromProspect ? 'flex-start' : 'flex-end')};
  color: var(--darkGray);
  font-size: 0.75rem;
  white-space: pre;
`;

function Message(props) {
  const { message, dt, fromProspect, unreadByRecipient } = props;

  const getFormattedDateTime = dt => {
    const zone = moment.tz.guess();
    const date = moment.tz(dt, zone).format('L');
    const time = moment.tz(dt, zone).format('LT');
    return [date, time];
  };

  const dateTime = getFormattedDateTime(dt);

  const checkWhenDate = date => {
    const today = getFormattedDateTime(moment().d)[0];
    const yesterday = getFormattedDateTime(moment().subtract(1, 'day'))[0];
    return date === today ? 'Today' : date === yesterday ? 'Yesterday' : date;
  };

  const bubbleColor = fromProspect ? 'sherpaTeal' : 'sherpaBlue';

  return (
    <StyledListItem
      data-test={fromProspect ? 'prospect-message' : 'user-message'}
      className={unreadByRecipient ? "unread message" : "message"}
      onClick={props.onClick}
    >
      <MessageInfo>
        <StyledMessage unread={unreadByRecipient} fromProspect={fromProspect}>{message}</StyledMessage>
        <TimeStamp fromProspect={fromProspect}>
          {`${checkWhenDate(dateTime[0])}  |  ${dateTime[1]}`}
        </TimeStamp>
      </MessageInfo>
      {props.showInitials && <NameBubble color={bubbleColor} initials="SV"/>}
    </StyledListItem>
  );
}

export default Message;
