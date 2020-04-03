import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabContent, TabPane } from 'reactstrap';
import { desktopCampaignDetailHeaderInfo } from '../../helpers/variables';
import SendTab from './CampaignSendTab/CampaignSendTab';
import MetricsTab from './CampaignMetricsTab/CampaignMetricsTab';
import TabbedHeader from '../../components/TabbedHeader';
import NotesTab from '../../components/NotesTab/NotesTab';
import * as noteActions from '../../store/CampaignDetails/notes/actions';
import { campaignNotesList, campaignNotesStatus } from '../../store/CampaignDetails/notes/selectors';
import { useParams } from 'react-router-dom';
import { getCampaign } from '../../store/Campaigns/selectors';
import { fetchSingleCampaign } from '../../store/Campaigns/thunks';
import CreateFollowup from '../DesktopCampaignDetailPage/CreateFollowup';
import Modal from '../../components/Modal';

const DesktopCampaignDetailPage = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('2');
  const { id } = useParams();
  const campaign = useSelector(getCampaign(id));
  const dispatch = useDispatch();
  const notesList = useSelector(campaignNotesList);

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleModal = () => setIsOpen(state => !state);
  const actionBtns = useMemo(
    () => {
      const [createFollowup] = desktopCampaignDetailHeaderInfo.actions.main;
      createFollowup.action = () => setIsOpen(true);

      return { actions: { main: [createFollowup] } };
    },
    [desktopCampaignDetailHeaderInfo]
  );

  const createFollowUp = (
    <Modal isOpen={isOpen} toggle={toggleModal} dataTest='create-followup-modal' title='Create Follow-Up'>
      <CreateFollowup toggle={toggleModal} />
    </Modal>
  );
  useEffect(() => {
    // when there is no campaign
    if (!campaign.id) {
      dispatch(fetchSingleCampaign(id));
    }
  }, []);


  const notesProps = {
    fetchNotes: noteActions.fetchCampaignNotes,
    updateNotes: noteActions.updateCampaignNotes,
    subject: 'campaign',
    subjectId: id,
    notesList,
    notesStatus: campaignNotesStatus,
    addNote: noteActions.addCampaignNote,
    editNote: noteActions.editCampaignNote,
    deleteNote: noteActions.deleteCampaignNote,
    restoreNote: noteActions.restoreCampaignNote
  };

  return (
    <div className="pageContent d-flex flex-column">
      {createFollowUp}
      <TabbedHeader
        data={{ ...desktopCampaignDetailHeaderInfo, actionBtns }}
        toggleTab={toggleTab}
        activeTab={activeTab}
      >
        <h1 className='text-white text-left m-0'>{campaign.name}</h1>
      </TabbedHeader>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <MetricsTab />
        </TabPane>
        <TabPane tabId='2'>
          <SendTab />
        </TabPane>
        <TabPane tabId='3'>
        </TabPane>
        <TabPane tabId='4'>
          <NotesTab {...notesProps} />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DesktopCampaignDetailPage;
