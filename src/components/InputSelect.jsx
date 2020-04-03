import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center !important;
  justify-content: space-between;

  border-bottom: 1px solid var(--mediumGray) !important;
  color: var(--sherpaBlue);

  select {
    color: inherit !important;
    -webkit-appearance:     none;
    -moz-appearance:        none;
    -ms-appearance:         none;
    -o-appearance:          none;
    appearance:             none;
  }

  @media (min-width: 768px) {
    border-bottom-width: 2px !important;
  }
`;

function InputSelect(props) {
  const icon = (
    <FontAwesomeIcon icon="chevron-up" rotation={180} />
  );

  return (
    <Wrapper>
      <Input type='select' {...props}>
        {props.children}
      </Input>
      {props.icon || icon}
    </Wrapper>
  );
}

export default InputSelect;
