import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { fetchMessages, sendMessage, patchMessage, markAllMessagesAsRead } from './utils';
import * as vars from '../../helpers/variables';
import { DataLoader } from '../LoadingData';
import { addNewToast } from '../../store/Toasts/actions';
import { useDispatch } from 'react-redux';
import { removeCampaignProspect } from '../../store/campaignProspectStore/actions';
import { arrayToMapIndex } from '../../store/utils';
import { populateProspectMessages, updateProspectMessage } from '../../store/ProspectDetails/messages/actions';

const MessagesWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: static;
    top: 0;

    & > div.displayedData {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      overflow: auto;
    }
  }
`;

const StyledList = styled.ul`
  padding: var(--pad3) var(--xpad) 0;
  /* number comes from claculated height of message input */
  padding-bottom: 5.6875rem;
  width: 100%;
  position: relative;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  margin: 0;

  @media (min-width: 768px) {
    padding: 15rem var(--xpad) 10rem;
  }
`;

const Placeholder = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--darkGray);
  padding: var(--pad3);
  line-height: 1.3 !important;
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;

  @media (min-width: 768px) {
    position: absolute;
  }
`;

function MessagesTab(props) {
  const [mappedMessages, setMappedMessages] = useState([]);
  const [messagesStatus, setMessagesStatus] = useState(vars.Success);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const { messages } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setHasUnreadMessages(messages.some(message => message.unreadByRecipient));
  }, [messages]);

  // deprecated by action that needs to update optimistically
  const updateMessages = (idx, value) => {
    dispatch(updateProspectMessage({ ...messages[idx], unreadByRecipient: value }));
  };

  const updateMessage = (id) => () => {
    const messageIdx = messages.findIndex(m => m.id === id);
    const hasOneUnreadMessage = messages.filter(message => message.unreadByRecipient).length === 1;
    if (messageIdx) {
      // optimistic update
      updateMessages(messageIdx, false);
      patchMessage(id)
        .then(_ => {
          // this means it's the one we just clicked
          if (hasOneUnreadMessage) {
            // remove campaign prospect from list
            dispatch(removeCampaignProspect(parseInt(props.subjectId)));
          }
        })
        .catch(error => {
          updateMessages(messageIdx, true);
          dispatch(addNewToast({ message: vars.generalNetworkError, color: 'danger' }));
        });
    }
  };

  const mapMessages = () => {
    if (messages.length) return [...messages].reverse().map(msg => <Message key={msg.dt} {...msg} onClick={msg.unreadByRecipient ? updateMessage(msg.id) : null} />);
    return <Placeholder className="textXL">{vars.messagesPlaceholderText}</Placeholder>;
  };

  const messagesRef = useRef();
  const inputRef = useRef();

  const tabContent = document.getElementsByClassName("tab-content");
  tabContent.scrollTop = messagesRef.scrollHeight;

  const fetchMessagesCB = useCallback(() => {
    const { subjectId } = props;
    subjectId && fetchMessages(subjectId)
      .then(res => {
        dispatch(populateProspectMessages({ [props.subjectId]: arrayToMapIndex('id', res) }));
        setMessagesStatus(res ? vars.Success : vars.FetchError);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, props.subjectId]);

  const scrollToNewMessageCB = useCallback(() => {
    const { current } = messagesRef;
    if (current) {
      tabContent[0].scrollTo({
        top: current.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [messagesRef]);

  const addNewMessage = message => {
    return sendMessage(props.subjectId, { message })
      .then(args => {
        if (hasUnreadMessages) {
          markAllMessagesAsRead(props.subjectId)
            .then(() => {
              fetchMessagesCB(args);
              dispatch(removeCampaignProspect(parseInt(props.subjectId)));
            });
        } else {
          fetchMessagesCB(args);
        }
      });
  };

  // retrieves all messages and sets an interval for periodic retrieval
  useEffect(() => {
    if (messages.length === 0) {
      // fetch messages in case we come from prospect-search
      fetchMessagesCB();
    }
    let interval = setInterval(fetchMessagesCB, vars.pollingInterval);

    return () => clearInterval(interval);
  }, [fetchMessagesCB]);

  // scrolls to new message after added
  useEffect(() => {
    scrollToNewMessageCB();
  }, [messages.length, scrollToNewMessageCB]);

  // scrolls bot on tab active
  useEffect(() => {
    const { current } = messagesRef;
    if (current) {
      tabContent[0].scrollTop = current.scrollHeight;
    }
  }, [props.scrollToBot, tabContent]);

  return (
    <MessagesWrapper data-test='messages-tab'>
      <DataLoader
        status={messagesStatus}
        data={(messages.length && messages) || [vars.messagesPlaceholderText]}
        emptyResultsMessage=''
        renderData={() => (
          <StyledList noMsg={messages.length === "0"} ref={messagesRef}>
            {mapMessages()}
          </StyledList>
        )}
      />
      <InputWrapper ref={inputRef}>
        <MessageInput
          subjectId={props.subjectId}
          messagesStatus={props.messagesStatus}
          addNewMessage={addNewMessage}
        />
      </InputWrapper>
    </MessagesWrapper>
  );
}

export default MessagesTab;
