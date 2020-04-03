import React from 'react';
import { useSelector } from 'react-redux';
import { actionBtnStatusSelector } from '../../store/uiStore/prospectDetailsView/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StatusActionButtons from '../../components/StatusActionBtns';

const ProspectActionBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 102%;
  margin-left: -1%;
  .statusAction {
    font-size: .75rem;
    padding: .4em;
  }
`;

const CycleBtnHoltser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-weight: 900;
    font-size: 1rem;
    margin-bottom: 0;
    display: inline-block;
  }

  .navArrow {
    &.disabled a {
      color: var(--mediumGray) !important;
      opacity: .5;
    }
    &:first-child svg {margin-right: 2px;}
    &:last-child svg {margin-left: 2px;}
  }
`;

function TabbedHeaderContent(props)  {
  const status = useSelector(actionBtnStatusSelector);
  const { prospect, prospects, idx, backButtonText } = props;

  const {
    ownerVerifiedStatus = false,
    doNotCall = false
  } = prospect;

  const statusList = [
    {
      text: 'Verified',
      color: 'green',
      icon: 'check',
      active: ownerVerifiedStatus === 'verified',
      attr: 'ownerVerifiedStatus',
      status: status.ownerVerifiedStatus
    },
    {
      text: 'DNC',
      color: 'red',
      icon: 'phone-slash',
      active: doNotCall,
      attr: 'doNotCall',
      status: status.doNotCall
    },
  ];

  const prevIcon = <FontAwesomeIcon className="mr-1" icon="chevron-circle-left" size="sm" />;
  const nextIcon = <FontAwesomeIcon className="ml-1" icon="chevron-circle-right" size="sm" />;

  return (
    <>
      <CycleBtnHoltser>
        {
          <span class={ idx > 0 ? "navArrow" : "navArrow disabled"}>
                <Link
                  data-test="prospect-cycle-left"
                  style={{ color: "white", frontSize: "40px" }}
                  to={{ pathname: `/prospect/${prospects[idx - 1]}/details`, state: { backButtonText: backButtonText } }}
                  replace={true}
                >
                  {prevIcon} Prev
                </Link>
          </span>
        }
        <h1 className='text-white text-left m-0'>{prospect.name}</h1>
        {
            <span class={ idx + 1 < prospects.length ? "navArrow" : "navArrow disabled"}>
                <Link
                  data-test="prospect-cycle-right"
                  style={{ color: "white", frontSize: "40px" }}
                  to={{ pathname: `/prospect/${prospects[idx + 1]}/details`, state: { backButtonText: backButtonText } }}
                  replace={true}
                >
                  Next {nextIcon}
                </Link>
          </span>
        }
      </CycleBtnHoltser>
      <ProspectActionBtns>
        <StatusActionButtons className="statusAction" prospect={prospect} statusList={statusList} />
      </ProspectActionBtns>
    </>
  )
}

export default TabbedHeaderContent;
