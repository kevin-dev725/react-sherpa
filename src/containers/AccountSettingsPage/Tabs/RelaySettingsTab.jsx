import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 1 30%;
      }
      &:nth-child(2) {
        flex: 1 1 40%;
        text-align: center;
      }
      &:nth-child(3) {
        flex: 0 1 30%;
        text-align: right;
      }
    }

    &.disabled {
      span {
        color: var(--gray);
      }
    }
  }
`;

function RelaySettingsTab(props) {

  // header components
  const smsRelayHeader = (
    <SectionHeader
      title="Prospect Relay"
    />
  );

  return (
    <>
      <SettingsSection type="list" header={smsRelayHeader}>
        <StyledList>
          <li className="item textM mb-1">
            <span className="fw-bold">Jimmy Fletcher</span>
            <span className="gray">
              Connections: <span className="fw-bold">4</span>
            </span>
            <span>
              Available: <span className="fw-bold">100</span>
            </span>
          </li>

          <li className="item textM mb-1">
            <span className="fw-bold">Jeffrey Fuller</span>
            <span className="gray">
              Connections: <span className="fw-bold">0</span>
            </span>
            <span>
              Available: <span className="fw-bold">89</span>
            </span>
          </li>

          <li className="item textM mb-1">
            <span className="fw-bold">Leon Hamilton</span>
            <span className="gray">
              Connections: <span className="fw-bold">1</span>
            </span>
            <span>
              Available: <span className="fw-bold">95</span>
            </span>
          </li>
        </StyledList>
      </SettingsSection>
    </>
  );
}

export default RelaySettingsTab;
