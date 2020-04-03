import React, { useState } from 'react';
import styled from 'styled-components';

import NameBubble from '../../../components/NameBubble';
import DesktopKebab from '../DesktopKebab';
import StatusActionBtns from '../../../components/StatusActionBtns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'reactstrap';
import { useSelector } from 'react-redux';
import { actionBtnStatusSelector } from '../../../store/uiStore/prospectDetailsView/selectors';

const Card = styled.div`
  --padding: var(--pad2) var(--pad3);
  position: relative;
  background: white;
  box-shadow: 0 6px 22px -8px #626262;
  width: calc(100% - var(--pad3) - var(--pad3));
  z-index: 2;
  margin: var(--padding) 0;
  border-radius: 5px;

  .card__details {
    padding: var(--padding);
    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .mainDetails {
        flex-grow: 2;
      }
    }
  }
  .card__statuses {
    border-top: 1px solid var(--mediumGray);
    padding: var(--padding);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .statusBtn {
      margin-right: .5rem;
      padding: .6rem .4rem;
      margin-top: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const ZillowLink = styled.a`
  svg {
    margin-right: .3em;
  }
`;

const ProspectCard = props => {
  const [isOpen, setIsOpen] = useState(false);
  const actionBtnStatus = useSelector(actionBtnStatusSelector);

  const { prospect } = props;
  // using zillow feature at a later date
  const showZillow = false;
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const {
    ownerVerifiedStatus = false,
    doNotCall = false,
    isQualifiedLead = false,
    isPriority = false
  } = prospect;
  const statusList = [
    {
      text: 'Verified',
      color: 'green',
      icon: 'check',
      active: ownerVerifiedStatus === 'verified',
      attr: 'ownerVerifiedStatus',
      status: actionBtnStatus.ownerVerifiedStatus
    },
    {
      text: 'DNC',
      color: 'red',
      icon: 'phone-slash',
      active: doNotCall,
      attr: 'doNotCall',
      status: actionBtnStatus.doNotCall
    },
    {
      text: 'Priority',
      color: 'orange',
      icon: 'bolt',
      active: isPriority,
      attr: 'isPriority',
      status: actionBtnStatus.isPriority
    },
    {
      text: 'Qualified',
      color: 'purple',
      icon: 'star',
      active: isQualifiedLead,
      attr: 'isQualifiedLead',
      status: actionBtnStatus.isQualifiedLead
    },
  ];

  const toggleIcon = (
    <FontAwesomeIcon className="ml-1" color="var(--sherpaBlue)" size="sm" icon="chevron-up" rotation={!isOpen ? 180 : null} onClick={toggle} />
  );

  const zillowSection = (
    <Collapse isOpen={isOpen}>
      <div className="card__details__zillow">
        <div className="zillow__pic">
        </div>
        {
          // TODO: zillow component - will use this feature later
        }
      </div>
      <span>I'm Zillow Section</span>
    </Collapse>

  );

  const zillowLink = (
    <ZillowLink href={prospect.zillowLink} className="ml-2 textS" rel='noopener noreferrer' target='_blank'>
      <FontAwesomeIcon icon="external-link-alt" />
    </ZillowLink>
  );

  return (
    <Card data-test='prospect-card'>
      <div className="card__details">
        <div className="card__details__wrapper">
          <NameBubble className="mr-2" size="3.5rem" initials="SV" />

          <div className="mainDetails">
            <h2>
              {prospect.name}
              {!showZillow && zillowLink}
              {showZillow && toggleIcon}
            </h2>
            <span className="darkGray">{prospect.phoneFormattedDisplay}</span>
          </div>

          <div className="kebab">
            <DesktopKebab actions={[]} />
          </div>
        </div>
        {showZillow && zillowSection}
      </div>
      <div className="card__statuses">
        <StatusActionBtns className="statusBtn" prospect={prospect} statusList={statusList}/>
        {
          // TODO: Find where these are on mobile
        }
      </div>
    </Card>
  );
};

export default ProspectCard;
