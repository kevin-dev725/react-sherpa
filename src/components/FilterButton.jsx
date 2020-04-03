import React, { useState, useEffect } from 'react';
import { Button, Collapse, CustomInput, FormGroup, Label } from 'reactstrap';
import Modal from './Modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilteredData } from '../store/Campaigns/thunks';
import { fetchCompanyOwners } from '../store/CompanyOwners/actions';
import { owners } from '../store/CompanyOwners/selectors';
import { sortByOrder } from '../store/Campaigns/selectors';
import { useParams } from 'react-router-dom';

import { getCompanyData } from '../store/Auth/selectors';
import { setCampaignFilter } from '../store/uiStore/campaignsPageView/actions';

import { getActiveFilter } from '../store/uiStore/campaignsPageView/selectors';

const Pane = styled.div`
  overflow: hidden;

  .form-group {
    margin: 0;
  }

  .custom-control {
    &:last-child {
      margin: 0;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--mediumGray);
    padding-bottom: var(--pad3);
  }

  &:not(:first-child) {
    padding-top: var(--pad3);
  }

  .content {
    padding-top: var(--pad2);
  }
`;

const Radio = styled(CustomInput)`
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: 0.6em;
  font-weight: bold;

  &[disabled] {
    color: var(--mediumGray);
  }
`;

const ToggleHeader = styled.h3`
  padding: 0;
  color: var(--darkNavy);
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div`
  color: var(--sherpaBlue);
  svg {
    transition: transform 0.3s;
  }
`;

function FilterButton() {
  const [modal, setModal] = useState(false);
  const [ownerFilterId, setOwnersFilterId] = useState(0);
  const { marketId } = useParams();

  const sortBy = useSelector(sortByOrder);
  const ownersList = useSelector(owners);
  const company = useSelector(getCompanyData);
  const activeFilter = useSelector(getActiveFilter);

  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const [isOpen1, setIsOpen1] = useState(true);

  const toggle1 = () => setIsOpen1(!isOpen1);

  // fetch owners to filter by
  useEffect(() => {
    if (company) {
      dispatch(fetchCompanyOwners(company.id));
    }
  }, [dispatch, company]);

  useEffect(() => {
    if (activeFilter) {
      setOwnersFilterId(0);
    }
  }, [activeFilter]);

  const handleSelect = event => {
    const {
      target: { id }
    } = event;
    setOwnersFilterId(parseInt(id));
  };

  const handleSubmit = () => {
    dispatch(fetchFilteredData({ owner: ownerFilterId, market: marketId, is_archived: false, ordering: sortBy }));
    dispatch(setCampaignFilter(ownerFilterId));
    setModal(false);
  };

  const ownerOptions = ownersList.map(owner => {
    const first = owner.firstName.charAt(0).toUpperCase() + owner.firstName.slice(1);
    const last = owner.lastName.charAt(0).toUpperCase() + owner.lastName.slice(1);
    return (
      <Radio
        key={`owner-${owner.id}`}
        type='radio'
        name='ownedBy'
        label={`${first} ${last}`}
        id={owner.id}
        onChange={handleSelect}
        data-test='filter-radio'
        checked={ownerFilterId === owner.id}
      />
    );
  });

  return (
    <>
      <Button className='p-0' color='link' data-test='filter-btn' onClick={toggle}>
        <FontAwesomeIcon icon='filter' size='lg' />
      </Button>

      <Modal isOpen={modal} toggle={toggle} title='Filters' btnText='Apply Filters' data-test='filter-modal'>
        <div>
          <Pane>
            <ToggleHeader className='fw-black textL' onClick={toggle1}>
              <Label htmlFor='ownedBy'>Owned By</Label>
              <Arrow isOpen={isOpen1}>
                <FontAwesomeIcon icon='chevron-up' rotation={isOpen1 ? null : 180} />
              </Arrow>
            </ToggleHeader>
            <Collapse isOpen={isOpen1}>
              <div className='content'>
                <FormGroup>{ownerOptions}</FormGroup>
              </div>
            </Collapse>
          </Pane>
        </div>

        <Button color='primary' size='lg' block className='mt-4' onClick={handleSubmit} data-test='apply-filter'>
          Apply Filters
        </Button>
      </Modal>
    </>
  );
}

export default FilterButton;
