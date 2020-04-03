import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import { CustomInput } from 'reactstrap';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 0 20%;
      }
      &:nth-child(2) {
        flex: 1 0 60%;
      }
      &:nth-child(3) {
        flex: 0 0 20%;
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

function AutoSettingsTab(props) {
// header components
  const autoSettingsHeader = (
    <SectionHeader title="Auto Tagging Settings" />
  );

  return (
    <>
      <SettingsSection type="list" header={autoSettingsHeader}>
        <StyledList>
          <li className="item textM mb-1">
            <span>Auto-Dead</span>
            <span>Choose whether your campaigns mark prospects as auto-dead</span>
            <span>
              <CustomInput
                type="switch"
                id="autoDeadToggle"
              />
            </span>
          </li>
          <li className="disabled item textM mb-1">
            <span>Auto-Dead</span>
            <span>This one is just an example of the disabled state</span>
            <span>
              <CustomInput
                type="switch"
                id="autoDeadToggle2"
                disabled
              />
            </span>
          </li>
        </StyledList>
      </SettingsSection>
    </>
  );
}

export default AutoSettingsTab;
