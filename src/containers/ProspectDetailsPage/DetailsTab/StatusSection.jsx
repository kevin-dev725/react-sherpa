import React from 'react';
import styled from 'styled-components';
import StatusActionBtns from '../../../components/StatusActionBtns';

const StatusActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const StatusSection = props => {
  return (
      <StatusActions>
        <StatusActionBtns statusList={props.statusList} prospect={props.prospect } />
      </StatusActions>
  );
};

export default StatusSection;
