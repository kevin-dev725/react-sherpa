import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.span`
  font-weight: ${props => props.isBold ? "900" : "400"};
`;

export default function SubInfo(props) {

  return (
    <StyledTitle isBold={!props.isRead}>
      { props.name }
    </StyledTitle>
  );
}
