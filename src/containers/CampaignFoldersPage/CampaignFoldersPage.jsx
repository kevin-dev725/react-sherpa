import React, { useEffect } from 'react';
import Header from '../../components/Header';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { marketsWithCampaigns, marketsStatus } from '../../store/Markets/selectors';
import { campaignFoldersToItemList } from './utils';
import { fetchMarkets } from '../../store/Markets/actions';
import { DataLoader } from '../../components/LoadingData';

const CampaignFoldersPage = props => {
  const campaignFolders = useSelector(marketsWithCampaigns);
  const isFetching = useSelector(marketsStatus);
  const dispatch = useDispatch();
  // dispatch fetchCampaigns

  useEffect(() => {
    if (campaignFolders.length === 1) {
      props.history.push(`/markets/${campaignFolders[0].id}/campaigns`);
    };
  }, [campaignFolders]);

  useEffect(() => {
    if (campaignFolders.length === 0) {
      dispatch(fetchMarkets());
    }
  }, [dispatch, campaignFolders.length]);

  // transform campaigns to proper list item views
  const listItems = campaignFoldersToItemList(campaignFolders);

  return (
    <div className='pageContent'>
      <Header>Campaigns</Header>
      <DataLoader
        status={isFetching}
        data={listItems}
        emptyResultsMessage='Currently You Have No Campaigns to Display.'
        renderData={() => <List items={listItems} />}
      />
    </div>
  );
};

export default CampaignFoldersPage;
