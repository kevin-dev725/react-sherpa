import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Icon from '../Icon.jsx';
import { LoadingSpinner } from '../LoadingSpinner.jsx';

const Action = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex-basis: ${props => props.size + 'vw'};
  flex-grow: 0;
  flex-shrink: 0;

  background-color: ${props => 'var(--' + props.bg + ')'};
  color: ${props => (props.bg === 'white' ? 'var(--gray)' : 'var(--white)')};

  img {
    max-width: 40%;
  }

  @media (max-width: 500px) {
    flex-basis: ${props => (props.wrapList ? 'calc(' + (100 - props.size) + 'vw / 3)' : '')};
  }
`;

const ActionLink = styled.a`
  cursor: pointer;
  &:after {
    z-index: 0 !important;
  }
  &:hover,
  &:active {
    &:after {
      background: var(--darkNavy);
      opacity: 0.1;
    }
  }
`;

function SwipeMenuAction(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Action
      data-test='swipeable-list-item-action'
      size={props.size}
      wrapList={props.wrapList}
      className='textS fw-black action'
      bg={props.background}
    >
      <LoadingSpinner
        isLoading={isLoading}
        size='1.125em'
        color='var(--gray)'
        renderContent={() => (
          <>
            <Icon margin='mb-2' height='26px' width='auto' name={'action-' + props.icon} />
            <ActionLink
              className='stretched-link'
              onClick={() => {
                setIsLoading(true);
                dispatch(props.handleClick).then(() => setIsLoading(false));
              }}
            >
              {props.name}
            </ActionLink>
          </>
        )}
      />
    </Action>
  );
}

export default SwipeMenuAction;
