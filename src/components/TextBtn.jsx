import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  color: ${props => props.color ? "var(--" + props.color + ")" : ""} !important;
  background: none !important;
  border: none !important;
  font-weight: 900 !important;
  padding: 0 !important;

  &:hover,
  &:active {
    text-decoration: underline !important;
  }
`;

function TextBtn(props) {
  return (
    <StyledButton color={props.color} {...props}>
      {props.children}
    </StyledButton>
  );
}

export default TextBtn;
