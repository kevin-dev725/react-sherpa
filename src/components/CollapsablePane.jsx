import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'reactstrap';

const ToggleHeader = styled.h3`
  padding: var(--pad4) var(--pad3);
  background: var(--ghostBlue);
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  @media (min-width: 768px) {
    padding: var(--pad2) 0;
  }
`;

function CollapsablePane(props) {
  const { toggle, isOpen, header, children } = props;
  const icon = <FontAwesomeIcon icon="chevron-up" rotation={!isOpen ? 180 : null} />;

  return (
    <div>
      <ToggleHeader className='fw-bold' onClick={toggle}>
        {header}
        {icon}
      </ToggleHeader>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
}

export default CollapsablePane;
