import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: var(--pad5);

  ul {
    padding: 0;
  }

  .settingCard {
    background: ${props => props.type === "form" ? "white" : "transparent"};
    padding:
      ${props => props.type === "form" ? "var(--pad3)" : "0"}
      ${props => props.type === "form" ? "var(--pad3)" : "0"}
      ${props => props.type === "form" ? "var(--pad1)" : "0"};
    border-radius: 4px;
  }

  .form-group {
    margin-bottom: var(--pad3);
  }

  .item {
    background: white;
    padding: var(--pad2) var(--pad3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.header {
      padding: var(--pad1) var(--pad3);
      background: none;
    }
  }
`;

function SettingSection(props) {
  return (
    <Section className={props.type} type={props.type} cols={props.cols}>
      {props.header}
      <div className="settingCard">
        {props.children}
      </div>
    </Section>
  );
}

export default SettingSection;
