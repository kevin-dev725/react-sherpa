import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabbedHeader from '../../components/TabbedHeader';
import SendTab from './SendTab/SendTab';
import { TabContent, TabPane } from 'reactstrap';
import styled from 'styled-components';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { campaignHeaderInfo } from '../../helpers/variables';
import MessagesTab from './MessagesTab/MessagesTab';
import { getCampaign } from '../../store/Campaigns/selectors';
import { getActiveTab } from '../../store/uiStore/campaignDetailsPageView/selectors';
import { setActiveCampaign } from '../../store/uiStore/prospectDetailsView/actions';
import { fetchSortedCampaigns } from '../../store/Campaigns/thunks';
import { campaignProspectSearch } from '../../store/campaignProspectStore/thunks';
import { useParams } from 'react-router-dom';
import { setCampaignActiveTab } from '../../store/uiStore/campaignDetailsPageView/actions';

const StyledTabContent = styled(TabContent)`
  /* padding: 0 var(--pad3); */
`;

function CampaignDetailsPage() {
  const activeTab = useSelector(getActiveTab);
  const { campaignId, marketId } = useParams();
  const campaign = useSelector(getCampaign(campaignId));
  const dispatch = useDispatch();

  const toggleTab = tab => {
    if (activeTab !== tab) dispatch(setCampaignActiveTab(tab));
  };

  // fetch campaign-prospects
  useEffect(() => {
    if (campaignId) {
      const filter = { name: 'is_priority_unread', value: true };
      dispatch(campaignProspectSearch(campaignId, { filter }));
    }
  }, [campaignId, dispatch]);

  // fetch campaign data if not in store already
  useEffect(() => {
    if (!campaign.id) {
      dispatch(fetchSortedCampaigns({ ordering: '-created_date', market: marketId, is_archived: false, page_size: 20 }));
    }
  }, [dispatch, campaign.id, campaignId]);

  const notesList = useSelector(campaignNotesList);

  const notesProps = {
    fetchNotes: noteActions.fetchCampaignNotes,
    updateNotes: noteActions.updateCampaignNotes,
    subject: 'campaign',
    subjectId: campaignId,
    notesList,
    notesStatus: campaignNotesStatus,
    addNote: noteActions.addCampaignNote,
    editNote: noteActions.editCampaignNote,
    deleteNote: noteActions.deleteCampaignNote,
    restoreNote: noteActions.restoreCampaignNote
  };

  return (
    <div className='pageContent'>
      <TabbedHeader data={campaignHeaderInfo} toggleTab={toggleTab} activeTab={activeTab}>
        <h1 className='text-white text-left m-0'>{campaign.name}</h1>
      </TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <SendTab campaign={campaign} />
        </TabPane>
        <TabPane tabId='2'>
          <MessagesTab campaignId={campaignId} />
        </TabPane>
        <TabPane tabId='3'>
          <NotesTab {...notesProps} />
        </TabPane>
      </StyledTabContent>
    </div>
  );
}

export default CampaignDetailsPage;
