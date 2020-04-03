import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
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

const StyledToggle = styled(DropdownToggle)`
  display: flex !important;
  justify-content: space-between;
  align-items: center;

  .icon {
    color: var(--sherpaBlue);
  }
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  width: 100%;
  border-radius: 0 !important;
  box-shadow: 0 3px 15px -11px var(--gray);
  top: -4px !important;
  max-height: 50vh;
  overflow-y: scroll;

  .dropdown-item {
    padding: calc(1.2em - 3vw) 1.5rem;
    font-size: 1.2rem;
  }
`;

function InputSelect2(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const icon = props.icon ? props.icon : (
    <FontAwesomeIcon className="icon" icon="chevron-up" rotation={!dropdownOpen ? 180 : null} />
  );

  const placeholder = (
    <div data-test='dropdown-value' className="gray">{props.placeholder}</div>
  );

  const value = (
    <div data-test='dropdown-value'>{props.value}</div>
  );

  return (
    <Wrapper>
      <Dropdown
        className="w-100"
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down">
        <StyledToggle tag="span" className="form-control">
          {!props.value ? placeholder : value}
          {icon}
        </StyledToggle>
        <StyledDropdownMenu
          data-test={props.dataTest || 'custom-dropdown'}
          flip={false}
          positionFixed={false}
          modifiers={{
            preventOverflow: {
              enabled: false,
              boundariesElement: document.getElementsByClassName('.tab-content')[0],
              padding: "12px"
            },
          }}>
          {props.options}
        </StyledDropdownMenu>
      </Dropdown>
    </Wrapper>
  );
}

export default InputSelect2;
