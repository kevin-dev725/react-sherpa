import React from 'react';
import Icon from '../../../components/Icon';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemLink = styled.p`
`;

const SubInfo = (props) => {
  return (
    <>
      <ItemLink
        data-test='list-item-link'
        to={props.link}
        className='stretched-link'
        onClick={props.onClick}
      >
        <Icon margin='ml-2' width='10px' name='arrow' alt='next' />
      </ItemLink>
    </>
  );
}
export default SubInfo;
