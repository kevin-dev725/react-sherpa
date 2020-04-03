import React from 'react';
import styled from 'styled-components';
import { } from 'reactstrap';

const Wrapper = styled.div`
  padding: var(--pad3) var(--pad3) var(--pad4);
  border-bottom: 1px solid var(--mediumGray);
`;

const CalloutHolster = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Callout = styled.div`
  border-left: 3px solid;
  border-left-color: ${props => props.color ? "var(--" + props.color + ")" : ""};
  padding-left: var(--pad2);

  span {
    color: var(--darkGray);
  }

  @media (min-width: 768px) {
    border-left-width: 2px;
    h3 {
      font-size: 2rem;
    }
    span {
      font-size: .8rem !important;
      line-height: 1;
    }
  }
  @media (min-width: 1200px) {
    span {
      font-size: 1rem !important;
    }
  }
`;

export function CalloutBlock(props) {
  return (
    <Callout color={props.color}>
      <h3 className="mb-0">{props.value}</h3>
      <span className="textS">{props.children}</span>
    </Callout>
  );
}

function CalloutSection(props) {
  return (
    <>
      <Wrapper>
        <h4 className="textXL fw-black mb-3">Batch #337</h4>
        <CalloutHolster>
          <CalloutBlock color="yellow" value="92">SMS Sent</CalloutBlock>
          <CalloutBlock color="purple" value="93%">Delivery Rate</CalloutBlock>
          <CalloutBlock color="red" value="0">Skipped</CalloutBlock>
        </CalloutHolster>
      </Wrapper>
    </>
  );
}

export default CalloutSection;
