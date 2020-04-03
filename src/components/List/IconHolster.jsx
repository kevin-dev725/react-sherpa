import React from 'react';
import {} from 'reactstrap';
import styled from 'styled-components';
import Icon from '../Icon.jsx';

const UnreadIndicator = styled.div`
  width: 100%;
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  --size: calc(5px + 1.2rem);

  &:after {
    /* if a count is given do secondary styling */
    content: ${props => (props.count ? "'" + props.count + "'" : "''")};
    width: ${props => (props.count ? 'var(--size)' : '.7rem')};
    height: ${props => (props.count ? 'var(--size)' : '.7rem')};
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${props => (props.count ? '3px' : '50%')};
    background-color: var(--red);
    color: white;
    font-size: ${props => (props.count < 100 ? 'calc(var(--size) / 2)' : '8px')};
    font-weight: 900;
    text-align: center;
    line-height: var(--size);
  }

  &:before {
    content: '';
    position: absolute;
    top: calc(var(--size) * 0.75);
    left: 15%;
    width: 0;
    height: 0;
    border-top: calc(var(--size) * 0.2) solid transparent;
    border-bottom: calc(var(--size) * 0.33) solid transparent;
    border-left: calc(var(--size) * 0.45) solid red;
    display: ${props => (props.count ? 'block' : 'none')};
  }
`;

const Holster = styled.div`
  flex-basis: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 3px;
  margin-right: var(--pad2);
`;

export const StyledIcon = styled(Icon)`
  flex-basis: 50%;
`;

function IconHolster(props) {
  const { icon, readable, isRead } = props;
  if (!icon && !readable) {
    return null;
  }

  return (
    <Holster className='iconHolster'>
      {icon}
      {readable && !isRead && (
        <UnreadIndicator data-test='unread-messages-indicator' count={props.count} />
      )}
    </Holster>
  );
}

export default IconHolster;
