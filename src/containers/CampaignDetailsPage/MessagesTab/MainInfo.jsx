import React from 'react';
import styled from 'styled-components';

const StyledMainInfo = styled.span`
  color: var(--darkGray);
`;

export default function MainInfo(props) {

  return (
    <StyledMainInfo className="textL">
      {props.message}
    </StyledMainInfo>
  );
}
