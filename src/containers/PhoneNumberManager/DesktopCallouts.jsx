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

    :nth-child(1) { flex-basis: 10%}
    :nth-child(2) { flex-basis: 20%}
    :nth-child(3) { flex-basis: 20%}
    :nth-child(4) { flex-basis: 20%}
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
      <p className="label mb-0 textM darkGray">{props.label}</p>
      <p className="value ">
        {props.icon ? icon : null}
        {props.value}
      </p>
    </div>
  );
};

const statusIcons = {
  active: { icon: "check-circle", value: "Good", iconCol: "green" },
  pending: { icon: "exclamation-triangle", value: "Pending", iconCol: "yellow" },
  inactive: { icon: "times-circle", value: "Inactive", iconCol: "grey" },
  release_pending1: { icon: "exclamation-triangle", value: "Release-Pending 1", iconCol: "red" },
  release_pending2: { icon: "exclamation-triangle", value: "Release-Pending 2", iconCol: "red" },
  released: { icon: "exclamation-triangle", value: "Released", iconCol: "red" }
};

const DesktopCallouts = props => {
  const { data } = props;
  const iconProps = statusIcons[data.status];

  return (
    <Callouts className="desktopCallouts">
      <Callout label="Status" {...iconProps} />
      <Callout value={data.parsedCreated} label="Created" />
      <Callout value={data.parsedLastSend} label="Last Send" />
      <Callout value={data.parsedLastReceived} label="Last Received" />
    </Callouts>
  );
};

export default DesktopCallouts;
