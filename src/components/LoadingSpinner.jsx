import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-border {
    width: ${props => props.size || '1em'};
    height: ${props => props.size || '1em'};
    border-width: ${props => props.border || '3px'};;
  }
`;

export const LoadingSpinner = props => {
  const { color = 'primary', isLoading = false } = props;
  const spinner = (
    <StyledSpinner size={props.size} border={props.border}>
      <Spinner data-test='loading-spinner' color={color} />
    </StyledSpinner>
  )

  return isLoading ? spinner : props.renderContent();
};
