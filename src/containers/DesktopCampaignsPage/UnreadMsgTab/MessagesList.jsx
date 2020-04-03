import React from 'react';
import styled from 'styled-components';
import NewMessagesList from '../../../components/NewMessagesList';

import { prospectsToItemList } from './utils';

const Wrapper = styled.div`
  padding: var(--ypad) var(--xpad);
`;

const MessagesList = props => {
  return (
    <Wrapper>
      <div className="pb-1 bb-1 mb-1 d-flex justify-content-between align-items-center">
        <h2 className="m-0">All Unread</h2>
      </div>
      <NewMessagesList listData={prospectsToItemList} />
    </Wrapper>
  );
};

export default MessagesList;
