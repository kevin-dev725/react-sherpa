import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Icon from './Icon';
import TabNav from './TabNav';
import { history } from '../history';
import IconBg from './IconBg';

const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--pad1) var(--xpad) ${props => (props.toggleTab ? '0' : null)};

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: calc(31px + 5vw + 1rem);
  }

  @media (min-width: 768px) {
    padding-bottom: ${props => (props.toggleTab ? '0' : 'var(--pad4)')};
    flex: 0 0 16vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const BackArrow = styled(Icon)`
  height: 100%;
`;

const BackButton = styled(Button)`
  align-items: center;
  padding-top: 0 !important;
  padding-bottom: .6rem !important;
`;

const BackArrowHolster = styled.div`
  display: inline-block;
  margin-right: 0.4em;

  img {
    margin-top: -3px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: .4rem 0;

  .tabbed-header {
    flex: 1 1 auto;
  }
`;

const ActionsHolster = styled.div`
  flex-direction: column;
  align-items: flex-end;
`;

function TabbedHeader(props) {
  const back = () => {
    history.goBack();
  };

  const mainActions = props.data.actions
    ? props.data.actions.main.map((a, idx) => {
      return (
        <Button
          {...a}
          size='md'
          id={idx}
          color={a.btnType}
          className='ml-1'
          onClick={a.action}
          key={idx}
        >
          {a.text}
        </Button>
      );
    })
    : null;

  const secondaryActions =
    props.data.actions && props.data.actions.secondary
      ? props.data.actions.secondary.map((a, idx) => {
        return (
          <Button id={a.action} className='p-0 ml-1' color='link' key={idx}>
            <IconBg
              color='darkNavy'
              textcol='sherpaTeal'
              icon={a.icon}
              width='2rem'
              height='2rem'
              size='sm'
            />
          </Button>
        );
      })
      : null;

  return (
    <StyledHeader {...props}>
      <HeaderTop backbtn={props.data.hasBackButton ? 1 : 0}>
        <div data-test='tabbed-header' className="tabbed-header">
          <div>
            {props.data.hasBackButton && (
              <BackButton data-test="prospect-details-back-button" className='text-dark pl-0' color='link' onClick={back}>
                <BackArrowHolster>
                  <BackArrow width='auto' name='arrowDark' />
                </BackArrowHolster>
                {props.data.fromText}
              </BackButton>
            )}
            {props.children}
          </div>
        </div>
        {props.data.actions && (
          <ActionsHolster className='d-none d-md-flex'>
            <div>{mainActions ? mainActions : null}</div>
            <div className='mt-1'>{secondaryActions ? secondaryActions : null}</div>
          </ActionsHolster>
        )}
      </HeaderTop>

      {props.toggleTab && (
        <TabNav data={props.data.tabs} activeTab={props.activeTab} toggleTab={props.toggleTab} />
      )}
    </StyledHeader>
  );
}

export default TabbedHeader;
