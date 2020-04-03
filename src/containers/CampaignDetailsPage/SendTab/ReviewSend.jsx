
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  campaignsBatchProspects,
  campaignsBatchProspectsError,
  campaignsBatchPropectsStatus
} from '../../../store/CampaignsBatchProspectsStore/selectors';
import { sendInitialSmsMessage } from '../.../../../../store/CampaignsBatchProspectsStore/actions';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CalloutSection from './CalloutSection';
import Icon from '../../../components/Icon';
import { CSSTransition } from 'react-transition-group';
import { DataLoader } from '../../../components/LoadingData';
import { Fetching } from '../../../helpers/variables';

const LeadInfo = styled.div`
  text-align: center;
  padding: var(--pad5) var(--pad3);

  .phoneNum {
    color: var(--gray);
  }
`;

const NoResults = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--darkGray);
  padding: var(--pad3);
  line-height: 1.3 !important;
  font-size: 20px;
  padding-top: 50%;
`;

const PreviewText = styled.p`
  background: var(--ghostBlue);
  padding: var(--pad3) 0;
  line-height: 1.5 !important;
  position: relative;
  margin: 0;
  padding: var(--pad4) var(--pad3);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(-1 * var(--pad3));
    background: var(--ghostBlue);
    width: 100vw;
    height: 100%;
    z-index: -99;
  }
`;

const LeadWrapper = styled.div`
  height: 0px;
  min-height: 400px;
  position: relative;
 
.displayedData {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

& >  p {
 flex: 1; 
}
}
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding: var(--pad4) var(--pad3);
`;

function renderLead({ transProps, campaignProspects, count }) {
  return campaignProspects.map((x, idx) => {
    return (
      idx === count ? (<>
        <LeadInfo>
          <h3 className='fw-bold name'>{x.prospect.name}</h3>
          <p className='phoneNum textM'>{x.prospect.phoneDisplay}</p>
          <p className='address m-0 textL'>
            {`${x.prospect.propertyAddress}, ${x.prospect.propertyCity}, ${x.prospect.propertyState} ${x.prospect.propertyZip}`}
          </p>
        </LeadInfo>

        <PreviewText data-test='batch-prospect-message' className='textL'>
          {x.smsMsgText}
        </PreviewText>
      </>) : null
    );
  });
}

function ReviewSend() {
  const [count, setCount] = useState(0);
  const campaignProspects = useSelector(campaignsBatchProspects);
  const batchProspectsError = useSelector(campaignsBatchProspectsError);
  const isFetching = useSelector(campaignsBatchPropectsStatus);
  const dispatch = useDispatch();

  const transProps = {};
  transProps.timeout = 70;
  transProps.classNames = 'words';
  transProps.unmountOnExit = true;

  const handleSend = () => {
    if (batchProspectsError === '') {
      dispatch(sendInitialSmsMessage(campaignProspects[count]));
      setCount(state => state + 1);
    }
  };

  return (
    <>
      {/* <CalloutSection /> */}

      <LeadWrapper>
        <DataLoader
          status={isFetching}
          data={campaignProspects}
          emptyResultsMessage='No more messages to send'
          renderData={() => {
            if (count === campaignProspects.length)
              return <NoResults>No more messages to send</NoResults>;
            return renderLead({ campaignProspects, transProps, count });
          }}
        />
      </LeadWrapper>

      <ButtonSection>
        {
          // <LinkBtn color="orange"><Icon name="skip" margin="mr-1"/>Skip</LinkBtn>
          // <LinkBtn color="red"><Icon name="dnc" margin="mr-1"/>DNC</LinkBtn>
        }
        <Button
          data-test='batch-send-button'
          color='primary'
          size='lg'
          block
          disabled={
            count >= campaignProspects.length || batchProspectsError !== '' || isFetching === Fetching
          }
          onClick={handleSend}
        >
          <Icon name='sendWhite' margin='mr-1 mb-1' />
          Send
        </Button>
      </ButtonSection>
    </>
  );
}

export default ReviewSend;
