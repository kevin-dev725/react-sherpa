import React from 'react';
import styled from 'styled-components';
import { InputGroup } from 'reactstrap';

const StyledInputGroup = styled(InputGroup)`
  --borderCol: ${props =>
    props.error ? "var(--red)" :
    props.readonly ? "var(--darkGray)" :
    "var(--mediumGray)"
  };
  --borderSize: 1px;
  --border: var(--borderSize) solid var(--borderCol) !important;

  border-top: ${props => props.border === "full" ? "var(--border)" : "0"};
  border-right: ${props => props.border === "full" ? "var(--border)" : "0"};
  border-bottom: var(--border);
  border-left: ${props => props.border === "full" ? "var(--border)" : "0"};

  textarea {
    padding-left: var(--pad2);
    padding-right: var(--pad2);
  }

  @media (min-width: 768px) {
    --borderSize: 2px;
  }
`;

function InputGroupBorder(props) {
  return (
    <StyledInputGroup border={props.border} error={props.error} readonly={props.readonly} className="inputGroup">
      {props.children}
    </StyledInputGroup>
  );
}

export default InputGroupBorder;
