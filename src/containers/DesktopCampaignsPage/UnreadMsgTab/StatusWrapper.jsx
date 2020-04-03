import React, { useState } from 'react';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { actionBtnStatusSelector } from '../../../store/uiStore/prospectDetailsView/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';
import { prospectUpdateThunk } from '../../../store/prospectStore/thunks';
import { getNewVerifiedStatus } from '../../../components/StatusActionBtns';

const ButtonsHolster = styled.div`
  display: flex;
  margin: 0 .8rem 0 .3rem;
`;

const Action = styled(IconBg)`
  background-color: ${props => props.active ? "var(--" + props.color + ")" : "white"};
  color: ${props => props.active ? "white" : "var(--gray)"};
  border: 1px solid;
  border-color: ${props => props.active ? "var(--" + props.color + ")" : "var(--gray)"};
  margin-left: .4rem;
  cursor: pointer;
  position: relative;
  z-index: 2;
  svg {
    color: ${props => props.active ? "white" : "var(--gray)"};
    border: none;
  }
`;

const StatusAction = (props) => {
  let btnSize = "1.5rem";
  let fasize = "xs";
  return (
    <Action
      width={btnSize}
      size={fasize}
      height={btnSize}
      style={{fontSize: ".8rem"}}
      {...props}
    >
    {props.children}
    </Action>
  )
}


const StatusWrapper = (props) => {
  const [loadingStatus, setLoadingStatus] = useState({})
  const actionBtnStatus = useSelector(actionBtnStatusSelector);
  const prospect = useSelector(getProspect(props.prospectId));
  const dispatch = useDispatch();

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
    }
  ];

  const getFormattedDateTime = () => {
    const zone = moment.tz.guess();
    const date = moment.tz(props.time, zone).format('L');
    const time = moment.tz(props.tiem, zone).format('LT');
    return [date, time];
  };

  const dateTime = getFormattedDateTime();

  const determineDateOrTime = () => {
    const isSameDay = moment(new Date().toISOString()).isSame(props.time, 'day');

    return isSameDay ? dateTime[1] : dateTime[0];
  }

  const leadClass = props.leadStage === "Dead" ? "gray" : null;

  //onchange status
  const onStatusChange = attr => () => {
    let value = !prospect[attr];
    // special case for verified status as it is not a boolean but a
    // string
    if (attr === 'ownerVerifiedStatus') {
      let currentValue = prospect[attr];
      value = getNewVerifiedStatus(currentValue);
    }
    setLoadingStatus(state => ({ ...state, [attr]: true }));
    dispatch(prospectUpdateThunk(prospect.id, { [attr]: value }, dispatch, false)).then(() => {
      setLoadingStatus(state => ({ ...state, [attr]: false }));
    });
  };

  // render statusActions
  const statusActions = statusList.map((item, key) => (
    <StatusAction
      title={item.text}
      data-test='status-action-button'
      key={key}
      attr={item.attr}
      onClick={onStatusChange(item.attr)}
      color={item.color}
      active={item.active}
      icon={item.icon}
      loader={{
        isLoading: loadingStatus[item.attr],
        color: 'transparent'
      }}
    />
  ));
  return (
    <>
      <span className={leadClass + " textS"}>{ props.leadStage }</span>
      <ButtonsHolster>
        {statusActions}
      </ButtonsHolster>
      <span className="gray textXS">{determineDateOrTime()}</span>
    </>
  );
}
export default StatusWrapper;
