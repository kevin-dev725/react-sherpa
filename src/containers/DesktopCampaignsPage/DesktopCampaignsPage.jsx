import React, { useState, useMemo } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import CampaignsListTab from './CampaignsListTab/CampaignsListTab';
import { desktopCampaignHeaderInfo } from '../../helpers/variables';
import UnreadMsgTab from './UnreadMsgTab/UnreadMsgTab';
import TabbedHeader from '../../components/TabbedHeader';
import Modal from '../../components/Modal';
import CreateCampaignForm from '../../components/NewCampaignForm';
import styled from 'styled-components';

const StyledTabContent = styled(TabContent)`
  overflow: hidden;
  flex: 0 0 calc(100vh - 16vw);
`;

const DesktopCampaignsPage = props => {
  const [activeTab, setActiveTab] = useState('1');
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState({});

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggle = () => setIsOpen(!isOpen);

  const createCampaign = (
    <Modal isOpen={isOpen} toggle={toggle} title='Create Campaign'>
      <CreateCampaignForm
        saveFormState={(values) => setFormState(values)}
        initialState={formState}
      />
    </Modal>
  );

  const actionBtns = useMemo(
    () => {
      const [newCampaign] = desktopCampaignHeaderInfo.actions.main;
      newCampaign.action = () => setIsOpen(true);

      return { actions: { main: [newCampaign] } };
    },
    [desktopCampaignHeaderInfo]
  );

  return (
    <div className="pageContent d-flex flex-column">
      <TabbedHeader
        data={{ ...desktopCampaignHeaderInfo, actionBtns }}
        toggleTab={toggleTab}
        activeTab={activeTab}
      >
        <h1 className='text-white text-left m-0'>Campaigns</h1>
      </TabbedHeader>
      <StyledTabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <CampaignsListTab />
        </TabPane>
        <TabPane className="h-100" tabId='2'>
          <UnreadMsgTab />
        </TabPane>
        <TabPane tabId='3'>
        </TabPane>
      </StyledTabContent>
      {isOpen ? createCampaign : null}
    </div>
  );
};

export default DesktopCampaignsPage;
