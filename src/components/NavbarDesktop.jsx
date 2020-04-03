import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import sherpaIcon from '../assets/images/sherpaIcon.png';
import sherpaLogo from '../assets/images/sherpaLogo.png';
import { Link } from 'react-router-dom';
import Routes from '../desktopRoutes.ts';
import { CSSTransition } from 'react-transition-group';
import { path } from '../store/Nav/selectors';
import { setPath } from '../store/Nav/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { logout } from '../store/Auth/actions';
import WithPermissions from './WithPermissions';

const SlideIn = styled(CSSTransition)`
  --timing: .3s;
  --width: calc(2rem + 7vw);
  position: relative;
  overflow: hidden;
  transition: width var(--timing), margin var(--timing);
  width: 0px;
  /* display: block; */
  &:not(.navText) {
    display: none;
  }
  &.navText { margin-left: 0rem; }

  &.slide {
    &-appear {
      display: block;
      width: 0px;
      &-active {
        display: block;
        width: var(--width);
      }
      &-done {
        display: block;
        width: var(--width);
      }
    }
    &-enter {
      width: 0px;

      &-active {
        &.navText { margin-left: 1rem; }
        width: var(--width);
        display: block;
      }
      &-done {
        &.navText { margin-left: 1rem; }
        width: var(--width);
        display: block;
      }
    }
    &-exit {
      &.navText { margin-left: 1rem; }
      transition: width var(--timing), margin .6s;
      width: var(--width);
      &-active {
        transition: width var(--timing), margin .6s;
        &.navText { margin-left: 0rem; }
        display: block;
        width: 0px;
      }

    }
  }
`;
const LogoSlide = styled(SlideIn)`
  --width: ${props => props.width};
  max-width: 100%;
`;
const StyledNavbar = styled(Navbar)`
  box-shadow: 0 0 36px -4px #00000091, 0 0 5px -1px #0000008c;
  min-height: 100vh;
  left: 0;
  flex-basis: ${props =>
    props.isOpen ? "300px" : "100px"};
  flex-basis: ${props =>
    props.isOpen ? "calc(4rem + 14vw)" : "calc(4rem + 4vw)"};
  flex-shrink: 4;
  flex-grow: 0;
  padding: 0 !important;
  flex-flow: column nowrap !important;
  z-index: 999;
  transition: flex-basis .3s;

  @media (min-width: 1800px) {
    flex-basis: ${props => props.isOpen ? "calc(4rem + 252px)" : "calc(4rem + 72px)"};
  }

  .navbar-brand {
    flex-grow: 0;
    margin: 0 !important;
    padding: 2rem !important;
  }
`;

const StyledNav = styled(Nav)`
  border-top: 1px solid var(--charcoal);
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 100%;
`;
const LogoutNav = styled(StyledNav)`
  justify-content: flex-end;
  margin-bottom: 1rem !important;
`;

const StyledNavItem = styled(NavItem)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-left: 4px solid transparent;
  padding: var(--pad1) var(--pad2);
  position: relative;
  width: 100%;

  &:active,
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-left-color: rgba(0, 0, 0, 0.25);
  }
  &.active {
    background: rgba(0, 0, 0, 0.6);
    border-left-color: var(--sherpaBlue);

    svg {
      color: white;
    }
  }
  &:not(.active) img,
  &:not(.active) span {
    opacity: .4;
  }

  img {
    max-width: 3vw;
  }
  svg {
    /* width: 2rem !important;
    height: 2rem; */
    color: #ffffff44;
  }
  .navLink {
    padding: .6rem !important;
    justify-content: center;
    align-items: center;
  }
  span {white-space: nowrap;}
`;

const ArrowBtnHolster = styled.div`
  position: absolute;
  /* padding and size of logo so it lines up with logo */
  top: calc(2rem + (34px / 2));
  right: 0;
  width: calc(.6rem + 1.8vw);
  height: calc(.6rem + 1.8vw);
  display: flex;
  transition: transform 0.15s;
  transform-origin: center center;
  transform: ${props =>
    (props.isOpen ? 'translate(50%,-50%) rotate(270deg)' : 'translate(50%,-50%) rotate(-90deg)')};
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
    width: calc(6px + .8vw);
    transition: transform 0.3s;
    transform: rotate(${props => (props.isOpen ? '0deg' : '180deg')});
  }

  @media (min-width: 1700px) {
    width: calc(.8rem + 37.4px);
    height: calc(.8rem + 37.4px);
  }
`;

const NavArrow = props => {
  return (
    <ArrowBtnHolster isOpen={props.isOpen} onClick={props.onClick} data-test='navbar-arrow'>
      <FontAwesomeIcon icon='chevron-up' rotation={props.isOpen ? null : 180} color="white" />
    </ArrowBtnHolster>
  );
};

const NavbarDesktop = props => {
  const [collapse, setCollapse] = useState(false);
  const toggleNavbar = () => setCollapse(!collapse);

  const routes = Routes.map((r, idx) => {
    let activeClass = props.page.location.pathname === r.path ? 'active' : '';
    let textClass = "navText align-items-center textL";
    let linkClass = "navLink textL stretched-link w-100 d-flex";

    return (
      <WithPermissions
        key={idx}
        name={r.name}
        checkPermissions={r.checkPermissions}
        {...r.permissionProps}
      >
        <StyledNavItem data-test={`desktop-nav-${r.name}`} className={activeClass} onClick={() => dispatch(setPath(r.path))}>
          <NavLink className={linkClass} tag={Link} to={r.path} >
            <FontAwesomeIcon icon={r.navIcon} size="lg" />
            <SlideIn
              in={collapse}
              timeout={300}
              appear={true}
              className={textClass}
              classNames="slide"
              unmountOnExit={true}>
              <span>{r.name}</span>
            </SlideIn>
          </NavLink>
        </StyledNavItem>
      </WithPermissions>
    );
  });

  const dispatch = useDispatch();

  return (
    <StyledNavbar isOpen={collapse} vertical color='dark' dark expand='md' data-test='navbar'>
      <NavbarBrand tag='div' data-test='navbar-brand'>
        <Link to='/'>
          <LogoSlide
            in={collapse}
            timeout={300}
            appear={true}
            width="160px"
            classNames="slide">
            <img src={sherpaLogo} alt='Lead Sherpa' />
          </LogoSlide>
          <LogoSlide
            in={!collapse}
            timeout={300}
            appear={true}
            width="35px"
            classNames="slide">
            <img src={sherpaIcon} alt='Lead Sherpa' />
          </LogoSlide>
        </Link>
      </NavbarBrand>

      <NavArrow isOpen={collapse} className='arrow' onClick={toggleNavbar} />

      <StyledNav vertical navbar data-test='routes'>
        {routes}
      </StyledNav>

      <LogoutNav vertical navbar className>
        <NavItem>
          <NavLink
            onClick={() => dispatch(logout())}
            className='navLink textL'
            data-test='logout-link'
          >
            Log out
          </NavLink>
        </NavItem>
      </LogoutNav>
    </StyledNavbar>
  );
};

export default NavbarDesktop;
