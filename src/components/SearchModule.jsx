import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Input, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';
import IconBg from './IconBg';
import InputGroupBorder from './InputGroupBorder';
import SortModule from './SortModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { resetCampaignFilter } from '../store/uiStore/campaignsPageView/actions';
import { getFilteredOwners } from '../store/uiStore/campaignsPageView/selectors';

const FilterPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: var(--pad1);
`;
const Pill = styled.div`
  background: var(--sherpaTeal);
  padding: var(--pad1) var(--pad2);
  border-radius: var(--pad4);
  margin: var(--pad1) var(--pad1) 0 0;
  color: white;
  font-weight: 900;
  font-size: .8rem;

  svg {
    margin-left: var(--pad1);
  }
`;

const StyledSearch = styled(Container)`
  padding: var(--pad2) var(--pad3) !important;
  background: var(--ghostBlue);
`;

function SearchModule(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const filterOwner = useSelector(getFilteredOwners);
  const dispatch = useDispatch();

  const onChange = e => setSearchTerm(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    props.searchTerm(searchTerm);
  };

  return (
    <StyledSearch data-test={props.dataTest || ''}>
      <Row>
        {props.showSearch && (
          <Col>
            <form onSubmit={onSubmit}>
              <InputGroupBorder className='mb-2'>
                <Input
                  type='text'
                  name='Search'
                  placeholder='Search'
                  value={searchTerm}
                  onChange={onChange}
                />
                <InputGroupAddon addonType='append'>
                  <Button disabled={searchTerm.length < 3} className='p-0' color='link' type="submit">
                    <IconBg color='primary' width='36px' height='36px' textcol='white' icon='search' />
                  </Button>
                </InputGroupAddon>
              </InputGroupBorder>
            </form>
          </Col>
        )}

        {props.showSort && (
          <Col>
            <SortModule
              marketId={props.marketId}
              sortOptions={props.sortingOptions}
              sortChange={props.sortChange}
              defaultValue={props.defaultValue}
            />
          </Col>
        )}

        {props.showFilter && (
          <Col className='d-flex align-items-center' xs='auto'>
            {props.children}
          </Col>
        )}
      </Row>
      {filterOwner ? (
        <FilterPills>
          {filterOwner.map((filter) => (
            <Pill key={`filter-${filter.id}`}>{filter.user.fullName}<FontAwesomeIcon icon="times" onClick={() => dispatch(resetCampaignFilter())} /></Pill>
          ))}
        </FilterPills>)
        : null}
    </StyledSearch>
  );
}

export default SearchModule;
