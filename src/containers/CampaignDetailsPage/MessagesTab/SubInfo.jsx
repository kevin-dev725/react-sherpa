import React from 'react';
import styled from 'styled-components';

const StyledSubInfo = styled.span`
  color: var(--sherpaBlue);
  color: ${props => props.status === "Dead" ? "var(--gray)" : "var(--sherpaBlue)"};
`;

export default function SubInfo(props) {

  let defaultStage = props.status || "Follow-Up";

  return (
    <StyledSubInfo status={defaultStage}>
      { defaultStage }
    </StyledSubInfo>
  );
}
