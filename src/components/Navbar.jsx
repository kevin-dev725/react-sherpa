import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/images/sherpaLogo.png';
import { Link } from 'react-router-dom';
import Routes from './../routes.ts';
import Icon from './Icon.jsx';
import UnreadMsgIcon from './UnreadMsgIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { logout } from '../store/Auth/actions';
import { getCampaignProspectsUnreadCount } from '../store/campaignProspectStore/selectors';

const StyledNavbar = styled(Navbar)`
  box-shadow: 0 0 36px -4px #00000091, 0 0 5px -1px #0000008c;
  min-height: calc(31px + 5vw + 1rem);

  .navbar-brand {
    flex-grow: 1;
  }
  .messages {
    margin-right: var(--pad3);
  }
`;

const StyledNav = styled(Nav)`
  padding: var(--pad1) 0 var(--pad3);
  border-top: 1px solid var(--charcoal);
  margin-top: var(--pad1);
`;

const StyledNavItem = styled(NavItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-betweeen;
  align-items: center;
  border-left: 3px solid transparent;
  padding: var(--pad1) var(--pad3);
  position: relative;

  &:active,
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-left-color: rgba(0, 0, 0, 0.25);
  }
  &.active {
    background: rgba(0, 0, 0, 0.6);
    border-left-color: var(--sherpaBlue);
  }
`;

const NavScreen = styled.div`
  position: absolute;
  pointer-events: ${props => (props.isOpen ? 'all' : 'none')};
  top: 100%;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.64);
  transition: opacity 0.3s;
  opacity: ${props => (props.isOpen ? 1 : 0)};
`;

const NavIcon = props => {
  return (
    <div style={{ zIndex: 999 }} onClick={props.onClick}>
      <Icon name='emptyHamburgerWhite' width='32px' />
    </div>
  );
};

const ArrowBtnHolster = styled.div`
  position: absolute;
  bottom: 0;
  right: var(--pad3);
  width: var(--pad7);
  height: var(--pad7);
  display: flex;
  transition: transform 0.15s;
  transform: ${props => (props.isOpen ? 'translateY(40%)' : 'translate(var(--pad1),40%)')};
  align-items: center;
  justify-content: center;
  z-index: 99;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--darkNavy);
    border-radius: 50%;
    z-index: -1;
  }

  img {
    transition: transform 0.3s;
    transform: rotate(${props => (props.isOpen ? '0deg' : '180deg')});
  }
`;

const NavArrow = props => {
  return (
    <ArrowBtnHolster isOpen={props.isOpen} onClick={props.onClick} data-test='navbar-arrow'>
      <Icon name='arrowWhite' width='18px' />
    </ArrowBtnHolster>
  );
};

const SherpNavbar = props => {
  const [collapse, setCollapse] = useState(false);
  const unreadSmsCount = useSelector(getCampaignProspectsUnreadCount);

  const toggleNavbar = () => setCollapse(!collapse);

  const routes = Routes.map((r, idx) => {
    let activeClass = props.page.location.pathname === r.path ? 'active' : '';

    return (
      <StyledNavItem className={activeClass} key={idx}>
        <FontAwesomeIcon icon={r.navIcon} size="lg" className='mr-2' color="white"/>
        <NavLink className='navLink textL stretched-link' tag={Link} to={r.path} onClick={toggleNavbar}>
          {r.name}
        </NavLink>
      </StyledNavItem>
    );
  });

  const dispatch = useDispatch();

  return (
    <div>
      <StyledNavbar isOpen={collapse} fixed='top' color='dark' dark expand='md' data-test='navbar'>
        <NavbarBrand tag='div' data-test='navbar-brand'>
          <Link to='/'>
            <img src={logo} alt='Lead Sherpa' />
          </Link>
        </NavbarBrand>
        <Nav className='messages' navbar>
          <NavItem>
            <Link style={{ color: 'white' }} to={'/new-messages'}>
              <UnreadMsgIcon count={unreadSmsCount} />
            </Link>
          </NavItem>
        </Nav>
        <NavbarToggler tag={NavIcon} onClick={toggleNavbar} />
        <NavArrow isOpen={collapse} className='arrow' onClick={toggleNavbar} />
        <Collapse isOpen={collapse} navbar data-test='navbar-collapse'>
          <StyledNav navbar data-test='routes'>
            {routes}
          </StyledNav>
          <StyledNav navbar>
            <NavItem>
              <NavLink
                onClick={() => dispatch(logout())}
                className='navLink textL'
                data-test='logout-link'
              >
                Log out
              </NavLink>
            </NavItem>
          </StyledNav>
        </Collapse>
        <NavScreen isOpen={collapse} onClick={toggleNavbar}></NavScreen>
      </StyledNavbar>
    </div>
  );
};

export default SherpNavbar;
