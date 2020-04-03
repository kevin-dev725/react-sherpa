import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  --size: 1.25rem;
  position: relative;
  font-size: var(--size);
`;

const Count = styled.div`
  background: var(--red);
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  font-size: calc(var(--size) * .5);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: var(--size);
  text-align: center;
  font-weight: 900;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(35%,-35%);
`;


const UnreadMsgIcon = (props) => {

  return (
    <Wrapper>
      <FontAwesomeIcon icon="comment-dots" size="lg" />
      {props.count ? <Count>{props.count}</Count> : null}
    </Wrapper>
  );
}

export default UnreadMsgIcon;
