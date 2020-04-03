// core libs
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

// components
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import { DataLoader } from '../../components/LoadingData';
import VirtualizedList from '../../components/VirtualizedList';
import SwipeListItem from '../../components/SwipeableList/SwipeableListItem';
import ListItem from '../../components/List/ListItem';

import {
  selectProspects,
  resetSearchResults
} from '../../store/uiStore/prospectSearchView/selectors';

// thunks
import { prospectSearch, prospectSearchNextPage } from '../../store/prospectStore/thunks';

// utils
import { prospectsToItemList } from './utils';
import { Fetching, Success, vListItems, vListHeight } from '../../helpers/variables';
import { resetProspects } from '../../store/prospectStore/actions';
import { prospectIsLoadingMore } from '../../store/prospectStore/selectors';
import { searchProspectsSuccess, searchProspectsNextPageSuccess, setSearchProspectIds, searchResetResults } from '../../store/uiStore/prospectSearchView/actions';

const SpinWrap = styled.div`
  padding: var(--pad5);
  text-align: center;
`;

function ProspectsSearch() {
  const prospectResults = useSelector(selectProspects);
  const isFetchingMore = useSelector(prospectIsLoadingMore);
  const shouldReset = useSelector(resetSearchResults);
  const dispatch = useDispatch();
  const [itemHeight, setItemHeight] = useState(vListItems);
  const [listHeight, setListHeight] = useState(vListHeight);
  const [loadingStatus, setLoadingStatus] = useState('');

  // transform prospect data into the appropriate data-interface for
  // ItemList
  const prospectList = prospectsToItemList(prospectResults);

  // search function
  const search = term => {
    setLoadingStatus(Fetching);
    dispatch(searchResetResults());
    dispatch(prospectSearch(term))
      .then(data => {
        setLoadingStatus(Success);
        dispatch(setSearchProspectIds(
          data.results.map(prospect => prospect.id)
        ));
      });
  };

  // fetch next-page function
  const fetchMoreData = () =>
    dispatch(prospectSearchNextPage())
      .then(data => {
        if (data.results.length > 0) {
          dispatch(setSearchProspectIds(
            data.results.map(prospect => prospect.id)
          ));
        }
      });

  // clear any previous search results
  useEffect(() => {
    if (shouldReset) {
      dispatch(searchResetResults());
    }
    // compute list size
    const windowHeight = window.innerHeight;
    const listHeight = document.getElementById("virtualizedList").offsetTop;
    setListHeight(windowHeight - listHeight);
  }, []);

  // calculate item height for virtualized-list
  useEffect(() => {
    if (prospectList.length > 0) {
      let sampleItem = prospectList[0];
      let itemId = `${sampleItem.id}-${sampleItem.firstName}`;
      let item = document.getElementById(itemId);

      if (item && item.offsetHeight !== 0) {
        setItemHeight(item.offsetHeight);
      }
    }
  }, [prospectList]);

  // onScroll event to fetch more data
  const onScroll = (top, event) => {
    let pageOffset = event.srcElement.scrollHeight;
    let offset = event.srcElement.offsetHeight + top;

    // only fire if we're at the bottom of the page
    if ((offset + (25 * itemHeight)) >= pageOffset) {
      fetchMoreData();
    }
  };

  const renderItem = ({ index, style }) => {
    let item = prospectList[index];

    return (
      <React.Fragment key={index}>
        <SwipeListItem style={style} threshold='.25' actions={item.actions} key={index}>
          <ListItem id={`${item.id}-${item.firstName}`} item={item} />
        </SwipeListItem>
      </React.Fragment>
    );
  };

  return (
    <div className='pageContent'>
      <Header>Prospect Search</Header>
      <SearchModule
        searchTerm={search}
        showFilter={false}
        showSearch={true}
        dataTest='prospect-search-input'
      />
      <DataLoader
        status={loadingStatus}
        data={prospectResults}
        emptyResultsMessage='No prospects were found that match your search'
        renderData={() => (
          <>
            <VirtualizedList
              id={'virtualizedList'}
              height={listHeight}
              itemHeight={itemHeight}
              onScroll={onScroll}
              items={prospectList}
              renderItem={renderItem}
            />
            {isFetchingMore ? (
              <SpinWrap>
                <Spinner color='primary' size='lg' />
              </SpinWrap>
            ) : null}
          </>
        )}
      />
    </div>
  );
}

export default ProspectsSearch;
