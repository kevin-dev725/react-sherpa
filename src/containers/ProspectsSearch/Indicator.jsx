import React from 'react';
import styled from 'styled-components';

const StyledIndicator = styled.span`
  color: var(--sherpaBlue);
  color: ${props => props.status === "Dead" ? "var(--gray)" : "var(--sherpaBlue)" || "var(--sherpaBlue)"};
`;

export default function Indicator(props) {

  return (
    <StyledIndicator status={props.status}>
      { props.status }
    </StyledIndicator>
  );
}
