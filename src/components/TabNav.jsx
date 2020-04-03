import React from 'react';
import styled from 'styled-components';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledNavItem = styled(NavItem)`
  margin-right: var(--pad2);
  @media (min-width: 768px) {
    margin-right: var(--pad9);
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 0 !important;
  padding-bottom: var(--pad2) !important;
  color: var(--white) !important;
  position: relative;
  cursor: pointer;

  &:after,
  &:before {
    transition: border-bottom-width 0.25s, border-top-width 0.25s;
    content: '';
    position: absolute;
    z-index: 999;
    bottom: 0;
    left: 50%;
  }
  &:after {
    width: 105%;
    border-bottom: 0px solid var(--darkNavy);
    border-radius: 15px;
    transform: translate(-50%, 30%);
  }
  &:before {
    height: 0;
    width: 0;
    border-right: 12px solid transparent;
    border-top: 0px solid var(--darkNavy);
    border-left: 12px solid transparent;
    transform: translate(-50%, 75%);
  }

  &.active {
    font-weight: 900;

    &:after {
      border-bottom-width: 5px;
    }

    &:before {
      border-top-width: 12px;
    }
  }
`;

const StyledNav = styled(Nav)`
  justify-content: space-between;
  border: none !important;
  position: relative;
  margin-top: var(--pad2);
  padding-top: 0;

  @media (min-width: 768px) {
    margin-top: var(--pad5);
    padding-top: var(--pad5);
    /* divider that runs across the header  */
    &:before {
      content: '';
      position: absolute;
      width: calc(100% + var(--pad5) + var(--pad5));
      height: 2px;
      top: 0;
      left: calc(-1 * var(--pad5));
      background: #ffffff38;
    }
  }
`;

function TabNav(props) {
  const tabs = props.data.map((item, key) => (
    <StyledNavItem key={key}>
      <StyledNavLink
        className={props.activeTab === item.idx ? 'active' : ''}
        onClick={() => {
          props.toggleTab(item.idx);
        }}
        data-test={item.name}
      >
        <FontAwesomeIcon icon={item.icon} className='mr-1' />
        {item.name}
      </StyledNavLink>
    </StyledNavItem>
  ));

  return (
    <div>
      <StyledNav
        className='textL justify-content-between justify-content-md-start'
        tabs
      >
        {tabs}
      </StyledNav>
    </div>
  );
}

export default TabNav;
