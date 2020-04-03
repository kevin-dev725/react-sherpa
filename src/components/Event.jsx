import React from 'react';
import styled from 'styled-components';

const EventInfo = styled.h4`
  position: relative;
  padding: 2px 0;
  background: var(--coolGray);
  margin-bottom: var(--pad4);
  .text {
    text-align: center;
    width: auto;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
  }
  &:before {
    content: '';
    position: absolute;
    width: 25vw;
    height: 1px;
    top: 50%;
    left: 0;
    background: var(--mediumGray);
    transform: translate(-80%, -50%);
  }
  &:after {
    content: '';
    position: absolute;
    width: 25vw;
    height: 1px;
    top: 50%;
    right: 0;
    background: var(--mediumGray);
    transform: translate(80%, -50%);
  }
`;

function Event() {
  return (
    <EventInfo className='textM'>
      <span className='text'>Zack Russle Verified Owner Today at 1:16pm</span>
    </EventInfo>
  );
}

export default Event;
