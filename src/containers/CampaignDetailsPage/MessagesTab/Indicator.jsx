import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const StyledIndicator = styled.time`
  color: var(--darkGray);
`;

export default function Indicator(props) {
  const timeSent = new moment(props.time).format('LT');
  return <StyledIndicator>{timeSent}</StyledIndicator>;
}
