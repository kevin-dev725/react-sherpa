import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Collapse, FormGroup, Label, CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// components
import Header from '../../components/Header';
import List from '../../components/List/List';
import SortModule from '../../components/SortModule';

// store imports
import { activeMarkets } from '../../store/Markets/selectors';
import {
  phoneNumbersList,
  isLoadingPhoneNumbers
} from '../../store/NumberManagerStore/selectors';
import { getPhoneNumbersList } from '../../store/NumberManagerStore/thunks';

// utils
import { numbersToItemList, processFilters, mergeNumberAndMarket } from './utils';
import { DataLoader } from '../../components/LoadingData';
import { fetchMarkets } from '../../store/Markets/actions';
import { comparators } from '../../components/TableWithSorting';
import { LoadingSpinner } from '../../components/LoadingSpinner';


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

  border-top: 1px solid var(--mediumGray);
  padding: var(--pad3) 0;

  .content {
    padding-top: var(--pad2);
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

// const data
const sections = [
  {
    name: 'Status',
    attr: ['status'],
    filterKey: 'status',
    options: [
      { label: 'Active', value: 'active', id: 0 },
      { label: 'Pending', value: 'pending', id: 1 },
      { label: 'Inactive', value: 'inactive', id: 2 },
      { label: 'Released', value: 'released', id: 3 },
    ],
  }
];

const sortOptions = [
  { name: 'First Sent', value: { id: 0, attr: 'lastSend', asc: 1, type: 'number' } },
  { name: 'Last Sent', value: { id: 1, attr: 'lastSend', asc: 0, type: 'number' } },
  { name: 'First Received', value: { id: 2, attr: 'lastReceived', asc: 1, type: 'number' } },
  { name: 'Last Received', value: { id: 3, attr: 'lastReceived', asc: 0, type: 'number' } },
  { name: 'Status', value: { id: 4, attr: 'status', asc: 1, type: 'string' } },
];

const FilterWrapper = styled.div`
  margin-right: var(--pad4);

  .filterHeader {
    height: 4.5rem;
  }
`;

const FilterSection = (props) => {
  const [toggleController, setToggleController] = useState(
    Array.from(props.sections, _ => true)
  );

  const toggle = (id) => {
    const newToggleControllers = [...toggleController];
    const current = !newToggleControllers[id];
    newToggleControllers[id] = current;
    setToggleController(newToggleControllers);
  };

  return (
    <FilterWrapper className="filterSection">
      <h2 className="filterHeader m-0">Filters</h2>
      <div>
        {props.sections.map(({ name, attr, options, filterKey }, idx) => (
          <Pane>
            <ToggleHeader className='fw-black textL' onClick={() => toggle(idx)}>
              <Label>{name}</Label>
              <Arrow isOpen={toggleController[idx]}>
                <FontAwesomeIcon icon='chevron-up' rotation={toggleController[idx] ? null : 180} />
              </Arrow>
            </ToggleHeader>
            <Collapse isOpen={toggleController[idx]}>
              <div className='content'>
                <FormGroup className="ml-3">
                  <LoadingSpinner
                    isLoading={options.length === 0}
                    color='primary'
                    size='2em'
                    renderContent={() => (
                      <>
                        {options.map(({ label, value }, idx) => (
                          <CustomInput
                            type="checkbox"
                            id={"checkbox-" + name + idx}
                            onChange={() => props.onFilterChange({ attr, id: idx, value: value, filterKey })}
                            label={label}
                          />
                        ))}
                      </>
                    )}
                  />
                </FormGroup>
              </div>
            </Collapse>
          </Pane>
        ))
        }
      </div>
    </FilterWrapper>
  );
};
const ListPage = (props) => (
  <ListWrapper>
    <div className="listHeader">
      <span className="title">{props.header}</span>
      <span className="sort">{props.sortBy}</span>
    </div>
    {props.children}
  </ListWrapper>
);

const ListWrapper = styled.div`
  flex: 1 0 80%;
  .listHeader {
    display: flex;
    justify-content: space-between;
    height: 4.5rem;

    .title {
      flex: 1 1 80%;
    }

    .sort {
      flex: 1 1 150px;
    }
  }
`;

const PhoneNumberPage = styled.div`
  padding: var(--ypad) var(--xpad);
  display: flex;
  justify-content: space-between;

  .filterSection {
    flex: 0 1 400px;
  }
`;

const PhoneNumberManagerPage = (props) => {
  const markets = useSelector(activeMarkets);
  const numbersList = useSelector(phoneNumbersList);
  const isLoading = useSelector(isLoadingPhoneNumbers);
  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);
  const customSections = useMemo(() => {
    return [
      ...sections,
      {
        name: 'Markets',
        attr: ['market', 'id'],
        filterKey: 'markets',
        options: markets.map(
          (market, idx) => ({ label: market.name, value: market.id, id: idx })
        )
      }
    ];
  }, [markets]);
  const [filters, setFilters] = useState({ status: {}, markets: {} });

  const onFilterChange = (data) => {
    let newFilters = {};

    // if it doesn't exist then add it
    if (!filters[data.filterKey][data.id]) {
      newFilters = {
        ...filters,
        [data.filterKey]: {
          ...filters[data.filterKey],
          [data.id]: data
        }
      };
    } else { // otherwise add it
      newFilters = { ...filters };
      delete newFilters[data.filterKey][data.id];
    }

    setFilters(newFilters);
  };

  const items = useMemo(() => {
    let numbersListWithMarkets = [];

    // applies sort and filter
    if (markets.length > 0 && numbersList.length > 0) {
      const comparator = comparators[activeSort.type][activeSort.asc];

      numbersListWithMarkets = mergeNumberAndMarket(numbersList, markets);
      numbersListWithMarkets = processFilters(numbersListWithMarkets, filters)
        .sort((number1, number2) =>
          comparator(number1[activeSort.attr], number2[activeSort.attr]));
    }
    return numbersToItemList(numbersListWithMarkets);
  }, [numbersList, markets, activeSort, filters]);


  useEffect(() => {
    if (numbersList.length === 0) {
      dispatch(getPhoneNumbersList());
    }

    if (markets.length === 0) {
      dispatch(fetchMarkets());
    }
  }, []);

  return (
    <div className="pageContent d-flex flex-column">
      <Header>Number Manager</Header>
      <PhoneNumberPage>
        <FilterSection
          className="filterSection"
          onFilterChange={onFilterChange}
          sections={customSections}
        />
        <ListPage
          header={<h2>{items.length} Numbers</h2>}
          sortBy={
            <SortModule
              sortChange={(value) => setActiveSort(value)}
              defaultValue={activeSort.id}
              sortOptions={sortOptions}
            >
            </SortModule>
          }
        >
          <DataLoader
            status={isLoading ? 'Fetching' : 'Success'}
            data={numbersList}
            emptyResultsMessage='You do not have any phone numbers yet.'
            renderData={() => (
              <List hasSidebar={true} items={items} />
            )}
          />
        </ListPage>
      </PhoneNumberPage>
    </div>
  );
};

export default PhoneNumberManagerPage;
