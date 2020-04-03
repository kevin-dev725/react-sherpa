import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// components
import { DataLoader } from '../../../../components/LoadingData';
import EditMarketForm from '../forms/EditMarketForm';
import Modal from '../../../../components/Modal';

// redux
import { activeMarkets, marketsStatus } from '../../../../store/Markets/selectors';
import { fetchMarkets } from '../../../../store/Markets/actions';

const EditBtn = styled.div`
  display: inline-block;
  &:hover svg {
    cursor: pointer;
    color: var(--sherpaBlue);
  }
`;

const MarketSection = () => {
  const markets = useSelector(activeMarkets);
  const isLoading = useSelector(marketsStatus);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState();
  const toggle = (id) => {
    setSelectedMarket(id);
    setModal(!modal);
  };

  // fetch markets if not already in the store
  useEffect(() => {
    if (markets.length === 0) {
      dispatch(fetchMarkets());
    }
  }, []);

  return (
    <DataLoader
      emptyResultsMessage="You do not have any active markets"
      data={markets}
      status={isLoading}
      renderData={() => (
        <>
          <ul data-test="acount-info-markets-list" className="p-0">
            {markets.map(market => (
              <li key={market.id} className="item textM mb-1">
                <span>{market.name}</span>
                <span className="gray">
                  Forwarding to
                  <span className="ml-1 darkGray fw-bold">{market.callForwardingNumber}</span>
                  <EditBtn>
                    <FontAwesomeIcon
                      style={{ cursor: 'pointer' }}
                      data-test={`market-item-${market.id}`}
                      icon="pencil-alt"
                      color="var(--green)"
                      className="ml-2"
                      onClick={() => toggle(market.id)}
                    />
                  </EditBtn>
                </span>
                <span>
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} icon="check-circle" color="var(--green)" className="mr-1" />
                  Active
                </span>
              </li>
            ))}
          </ul>
          <Modal
            isOpen={modal}
            toggle={toggle}
            data-test='filter-modal'
            title={'Edit Forwarding Number'}
          >
            <EditMarketForm marketId={selectedMarket} closeModal={toggle} />
          </Modal>
        </>
      )}
      dataTest="account-info-market-data-loader"
    />
  );
};

export default MarketSection;
