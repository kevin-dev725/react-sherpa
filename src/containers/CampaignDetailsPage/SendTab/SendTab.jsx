import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SelectTemplate from './SelectTemplate';
import ReviewSend from './ReviewSend';

import { fetchSmsTemplates } from '../../../store/SmsTemplateStore/actions';
import { smsTemplates } from '../../../store/SmsTemplateStore/selectors';
import { getUserData } from '../../../store/Auth/selectors';

import { updateSmsTemplate } from '../../../store/Campaigns/thunks';

import { fetchCampaignsBatchProspects } from '../../../store/CampaignsBatchProspectsStore/actions';

import CollapsablePane from '../../../components/CollapsablePane';
import { getBlockedReasonMessage } from '../utils';

const MessagingDisabled = styled.h3`
  padding: 16px;
  text-align: center;
  display: flex;
  margin-top: 35%;;
  align-items: center;
`;

const SendTab = ({ campaign }) => {
  const dispatch = useDispatch();
  const sms_Templates = useSelector(smsTemplates);
  const userData = useSelector(getUserData);
  const { smsTemplate } = campaign;
  const { campaignId } = useParams();


  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);
  const toggle2 = () => setIsOpen2(!isOpen2);

  useEffect(() => {
    // fetch all sms templates belonging to the company
    dispatch(fetchSmsTemplates());

    // fetch all campaign batch prospects using the campaign Id
    if (campaignId) {
      dispatch(fetchCampaignsBatchProspects(campaignId));
    }
  }, [dispatch]);

  const handleChange = e => {
    const chosenTemplate = e.target.value;
    const templateMessage = sms_Templates[parseInt(chosenTemplate)];

    let updatedCampaignTemplate = { ...campaign };
    updatedCampaignTemplate.smsTemplate = templateMessage.id;

    dispatch(updateSmsTemplate(updatedCampaignTemplate));
  };

  const blockReason = getBlockedReasonMessage(campaign.blockReason);

  if (blockReason) {
    return <MessagingDisabled data-test='disabled-messaging-message'>{blockReason}</MessagingDisabled>;
  }

  return (
    <>
      <CollapsablePane toggle={toggle1} isOpen={isOpen1} header='Select SMS Template'>
        <SelectTemplate
          templateChoices={sms_Templates}
          templateId={smsTemplate}
          choseTemplate={handleChange}
        />
      </CollapsablePane>
      <CollapsablePane toggle={toggle2} isOpen={isOpen2} header='Review & Send'>
        <ReviewSend />
      </CollapsablePane>
    </>
  );
};

export default SendTab;
