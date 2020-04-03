import React from 'react';
import Icon from '../../components/Icon';
import styled from 'styled-components';

const Holster = styled.div`
  display: flex;
  margin-top: var(--pad3);
`;
const Item = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: bold;

  color: ${props => (props.color === 'priority' ? 'var(--orange)' : 'currentColor')};

  &[disabled] {
    color: var(--mediumGray);
    img {
      opacity: 0.2;
    }
  }

  &:first-child {
    margin-right: var(--pad6);
  }

  img {
    margin-right: 4px;
  }
`;

const Count = styled.span`
  white-space: pre;
`;

const Type = styled.span`
  white-space: pre;
`;

export default function SubInfo(props) {
  const lDisabled = props.data.totalLeads === 0;
  const pDisabled = props.data.priorityCount === 0;

  return (
    <Holster>
      <Item disabled={lDisabled}>
        <Icon name='person' width='12px' />
        <Count data-test='campaign-lead-count'>{props.data.totalLeads}</Count>
        <Type> Leads</Type>
      </Item>
      <Item color='priority' disabled={pDisabled}>
        <Icon name='priority' width='11px' />
        <Count data-test='campaign-priority-count'>{props.data.priorityCount}</Count>
        <Type> Priority</Type>
      </Item>
    </Holster>
  );
}
