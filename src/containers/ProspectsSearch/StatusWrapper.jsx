import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import Indicator from './Indicator';

const ItemIndicator = styled.h4`
  margin: 0;
`;

const ItemLink = styled(Link)`
  &:hover,
  &:active {
    &:after {
      background: var(--darkNavy);
      opacity: 0.03;
    }
  }
`;

const StatusWrapper = (props) => {
  return (
    <>
      <ItemIndicator className="textS">
        <Indicator status={props.status} />
      </ItemIndicator>
      <ItemLink
        data-test="list-item-link"
        to={props.link}
        className="stretched-link"
        onClick={props.onClick}
      >
        <Icon margin='ml-2' width='10px' name='arrow' alt='next' />
      </ItemLink>
    </>
  );
};

export default StatusWrapper;
