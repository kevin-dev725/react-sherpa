import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--ypad) var(--xpad);

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: calc(31px + 5vw + 1rem);
  }
`;

function Header(props) {
  return (
    <StyledHeader {...props}>
      <h1 className="text-white text-left m-0">
      {props.children}
      </h1>
    </StyledHeader>
  );
}

export default Header;
