import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Select from '../../../components/InputSelect';

import { campaignsStatus } from '../../../store/Campaigns/selectors';
import { campaignsToItemList } from './utils';
import { fetchFilteredData, fetchFilteredDataNextPage } from '../../../store/Campaigns/thunks';
import { DataLoader } from '../../../components/LoadingData';
import { uiGetCampaignPageActiveTab, uiGetCampaignPageActiveSort, uiGetCampaigns } from '../../../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/selectors';
import {
  setCampaignPageActiveSort,
  setCampaignPageActiveTab,
  setCampaignPageTabData
} from '../../../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/actions';
import VirtualizedList from '../../../components/VirtualizedList';
import ListItem from '../../../components/List/ListItem';
import List from '../../../components/List/List';

const ListTab = styled.div`
  padding: var(--ypad) var(--xpad);
`;

const FilterSortSection = styled.div`
  display: flex;
  margin-bottom: var(--pad2);

  .groups {
    flex-basis: 100%;
    margin-right: var(--pad3);

    ul {
      display: flex;
      margin: 0;
      align-items: center;
      padding: 0;
      border-bottom: 2px solid var(--mediumGray);
      height: 100%;

      li {
        font-size: 1.125rem;
        margin-right: 3.5em;
        padding: 1rem 0;
        position: relative;
        cursor: pointer;

        &.active {
          color: var(--sherpaBlue);
          font-weight: bold;

          &:after {
            content: '';
            position: absolute;
            bottom: -3px;
            height: 4px;
            width: 100%;
            left: 0%;
            background: var(--sherpaBlue);
          }
        }
      }
    }
  }

  .sortBy {
    flex-basis: 200px;
  }
`;

const FilterSort = props => {

  return (
    <FilterSortSection>
      <div className="groups">
        <ul data-test="campaign-filter-tabs">
          {props.tabs.map((tab, idx) => (
            <li
              key={tab.id}
              className={props.activeTab === tab.id ? "active" : null}
              onClick={props.onClick(tab.params, tab.id)}>
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sortBy">
        {// replace with sortModule
        }
        <Select data-test="filter-campaigns-select" onChange={props.onChangeSort}>
          {//replace with sort Options
            props.sortingOptions.map(
              (option) => (
                <option key={option.name} value={option.value.value}>
                  {option.name}
                </option>
              )
            )
          }
        </Select>
      </div>
    </FilterSortSection>
  );
};


const tabs = [
  { id: 'all', name: 'All', params: { expand: 'market,created_by', page_size: 20 } },
  { id: 'active', name: 'Active', params: { is_archived: false, expand: 'market,created_by', page_size: 20 } },
  { id: 'followup', name: 'Follow-Up', params: { is_archived: false, is_followup: true, expand: 'market,created_by', page_size: 20 } },
  { id: 'ownedbyme', name: 'Owned By Me', params: { owner: 1, expand: 'market,created_by', page_size: 20 } },
  { id: 'archived', name: 'Archived', params: { is_archived: true, expand: 'market,created_by', page_size: 20 } }
];

const sortingOptions = [
  {
    name: 'Newest',
    value: { value: '-created_date', id: 0 }
  },
  {
    name: 'Oldest',
    value: { value: 'created_date', id: 1 }
  },
  {
    name: 'Alpha (A-Z)',
    value: { value: 'name', id: 2 }
  },
  {
    name: 'Alpha (Z-A)',
    value: { value: '-name', id: 3 }
  },
];

const CampaignsListTab = props => {
  const isFetching = useSelector(campaignsStatus);
  const activeTab = useSelector(uiGetCampaignPageActiveTab);
  const activeSort = useSelector(uiGetCampaignPageActiveSort);
  const { nextPage, campaigns, sortedBy } = useSelector(uiGetCampaigns);
  const dispatch = useDispatch();
  const [itemHeight, setItemHeight] = useState(150);
  const [listHeight, setListHeight] = useState(600);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  // refetch campaigns if switching tabs
  useEffect(() => {
    // only fetch when we don't have all of the
    // records
    if (!nextPage && campaigns.length === 0 || sortedBy !== activeSort) {
      const tab = tabs.find(t => t.id === activeTab);
      const override = activeSort === sortedBy;
      dispatch(fetchFilteredData({
        ...tab.params,
        ordering: activeSort
      }), !override)
        .then((data) => {
          const order = data.results.map(r => r.id);
          dispatch(setCampaignPageTabData({
            tab: activeTab,
            data: {
              sortOrder: order,
              nextPage: data.next,
              sortedBy: activeSort, // note update based on sort option
              count: data.count
            }
          }));
        });
    }
  }, [activeTab]);

  // calculate item height for virtualized-list
  useEffect(() => {
    if (campaigns.length > 0) {
      let sampleItem = campaigns[0];
      let itemId = `${sampleItem.id}-0`;
      let item = document.getElementById(itemId);

      if (item && item.offsetHeight !== 0) {
        setItemHeight(item.offsetHeight + 12);
      }
    }

    // compute list size
    const windowHeight = window.innerHeight;
    const vList = document.getElementById("virtualizedList");

    if (vList) {
      setListHeight(windowHeight - vList.offsetTop);
    }
  }, [campaigns]);

  const fetchMoreData = () => {
    if (nextPage) {
      dispatch(fetchFilteredDataNextPage(nextPage))
        .then((data) => {
          const order = data.results.map(r => r.id);
          dispatch(setCampaignPageTabData({
            tab: activeTab,
            data: {
              sortOrder: order,
              nextPage: data.next,
              sortedBy: activeSort
            }
          }));
        });
    }
  };

  // onScroll event to fetch more data
  const onScroll = (top, event) => {
    let pageOffset = event.srcElement.scrollHeight;
    let offset = event.srcElement.offsetHeight + top;

    // only fire if we're at the bottom of the page
    if (offset >= pageOffset) {
      fetchMoreData();
    }
  };

  const renderItem = ({ index, style }) => {
    let mItem = listItems[index];

    return (
      <React.Fragment key={index}>
        <ListItem id={`${mItem.id}-${index}`} style={style} item={mItem} />
      </React.Fragment >
    );
  };

  const onChangeSort = (e) => {
    const { target: { value } } = e;
    const tab = tabs.find(t => t.id === activeTab);

    dispatch(setCampaignPageActiveSort(value));
    dispatch(fetchFilteredData({
      ...tab.params,
      ordering: value
    }))
      .then((data) => {
        const order = data.results.map(r => r.id);
        dispatch(setCampaignPageTabData({
          tab: activeTab,
          data: {
            sortOrder: order,
            nextPage: data.next,
            sortedBy: value
          }
        }));
      });
  };

  return (
    <ListTab>
      <FilterSort
        sortingOptions={sortingOptions}
        onChangeSort={onChangeSort}
        tabs={tabs}
        onClick={(args, tab) => () => {
          dispatch(setCampaignPageActiveTab(tab));
        }}
        activeTab={activeTab}
      />
      <DataLoader
        status={isFetching}
        data={listItems}
        emptyResultsMessage="There are no campaigns in this view"
        renderData={() => (
          <VirtualizedList
            id={'virtualizedList'}
            height={listHeight}
            itemHeight={itemHeight}
            onScroll={onScroll}
            items={listItems}
            renderItem={renderItem}
          />
        )}
      />
    </ListTab>
  );
};

export default CampaignsListTab;
