import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Callouts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 2;
  flex-basis: 50%;

  .callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .value {
    margin-bottom: 5px;
  }
  .icon {
    margin-right: 5px;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  color: var(--${props => props.color});
`;
const Callout = props => {
  const icon = (
    <Icon
      icon={props.icon ? props.icon : ''}
      size="xs"
      className="icon"
      color={props.iconCol}
    />
  );

  return (
    <div className="callout">
      <p className="value textL fw-bold">
        {props.icon ? icon : null}
        {props.value}
      </p>
      <p className="label mb-0 textM darkGray">{props.label}</p>
    </div>
  );
};

const DesktopCallouts = props => {
  const { data } = props;
  const percentCompleted =
    typeof (data.percentCompleteUnsent) === "string" ?
      data.percentCompleteUnsent :
      `${parseInt(data.percentCompleteUnsent)}%`;

  return (
    <Callouts className="desktopCallouts">
      <Callout value={data.totalLeads || 0} label="Leads" icon="user" iconCol="sherpaTeal" />
      <Callout value={data.priorityCount} label="Priority" icon="bolt" iconCol="orange" />
      <Callout value={percentCompleted} label="Status" />
      <Callout value={data.health} label="Health" />
      <Callout value={data.market.name} label="Market" />
    </Callouts>
  );
};

export default DesktopCallouts;
