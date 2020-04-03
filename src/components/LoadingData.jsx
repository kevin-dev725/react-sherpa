import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';
import { Fetching, Success, FetchError } from '../helpers/variables';

const SpinWrap = styled.div`
  text-align: center;
  padding: var(--pad8);

  [class*='spinner'] {
    width: 4rem;
    height: 4rem;
    border-width: 0.4em;
  }

  ${props => (props.appWrapper ? `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    margin: 0 !important;

    & > [class*='spinner'] {
      width: 7rem;
      height: 7rem;
      border-width: 0.6em;
    }
  `
    : null)};

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: ${props => (props.topPad ? 'calc(31px + 5vw + 1rem)' : 0)};
  }
`;

export const NoResults = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--darkGray);
  padding: var(--pad3);
  line-height: 1.3 !important;
`;

const whenLoadingResults = (status, results) =>
  (status === Fetching && !results.length) || (status === Fetching && results.length);

const whenNoResults = (status, results) => status === Success && !results.length;

const whenError = status => status === FetchError;

// TODO: Cleanup Redux Actions to settle on an API that this component
// can use to make a generic data-loader component
export const DataLoader = props => {
  let {
    data,
    status,
    emptyResultsMessage = 'No Results Found',
    networkError = 'Cannot be displayed at this time.  Please try again later.',
    renderData,
    dataTest = '',
    fullPage = true,
    appWrapper = false,
  } = props;

  const renderedResults = whenNoResults(status, data) ? (
    <NoResults data-test='empty-data-message'> {emptyResultsMessage}</NoResults>
  ) : whenError(status) && !data.length ? (
    <NoResults data-test='network-error-message'>{networkError}</NoResults>
  ) : (
        <div data-test={dataTest || 'displayed-data'} className="displayedData">{renderData()}</div>
      );

  return (
    <>
      {whenLoadingResults(status, data) ? (
        <SpinWrap topPad={fullPage} appWrapper={appWrapper} data-test='spinner'>
          <Spinner color='primary' />
        </SpinWrap>
      ) : (
          renderedResults
        )}
    </>
  );
};
