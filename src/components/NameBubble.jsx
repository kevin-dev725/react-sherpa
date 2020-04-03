import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  --size: ${props => props.size};
  --initials: ${props => "'" + props.initials + "'"};
  --color: ${props => 'var(--' + props.color + ')'};
  background-color: var(--color);
  width: var(--size);
  height: var(--size);
  border-radius: calc(var(--size) * 1.5);
  color: white;
  line-height: var(--size);
  font-size: calc(var(--size) * .35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  position: relative;
  flex-shrink: 0;
  &:after {
    content: var(--initials);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

function NameBubble(props) {

  return (
    <Bubble
      className="nameBubble"
      size={props.size || '2.5rem'}
      initials={props.initials || ''}
      color={props.color || 'sherpaTeal'}
      {...props}/>
  );
}

export default NameBubble;
