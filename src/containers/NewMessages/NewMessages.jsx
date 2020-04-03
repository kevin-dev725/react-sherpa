import React from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import NewMessagesList from '../../components/NewMessagesList';
import { prospectsToItemList } from '../CampaignDetailsPage/utils';

const NewMessages = (props) => {
  return (
    <div className="pageContent">
      <TabbedHeader data={{}}><h1 className='text-white text-left m-0'>New Messages</h1></TabbedHeader>
      <NewMessagesList backButtonText="Unread Messages" listData={ prospectsToItemList }/>
    </div>
  );
}

export default NewMessages;
