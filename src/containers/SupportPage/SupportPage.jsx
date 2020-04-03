import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import SupportCard from './SupportCard';
import { supportItemsArray, supportItemsStatus } from '../../store/Support/selectors';
import { fetchSupportItems } from '../../store/Support/actions';
import { DataLoader } from '../../components/LoadingData';

const CardContainer = styled.div`
  margin: var(--pad5) auto 0;
  display: flex;
  flex-direction: column;
`;

const SupportWrap = styled.div`
  padding: var(--pad5) var(--pad3);
  text-align: center;
  background: var(--coolGray);
`;
const Subtitle = styled.p`
  text-align: center;
  max-width: 90%;
  margin: 0 auto;
  line-height: 1.4 !important;
`;
function SupportPage() {
  const support_items = useSelector(supportItemsArray),
    support_status = useSelector(supportItemsStatus),
    dispatch = useDispatch();

  const mappedSupportItems = support_items.map((item, idx) =>
    <SupportCard key={idx} item={item} />
  );

  useEffect(() => {
    if (support_items.length === 0) {
      dispatch(fetchSupportItems());
    }
  }, [dispatch, support_items.length]);

  return (
    <div className="pageContent">
      <Header>Support</Header>
      <SupportWrap>
        <h2>How can we help?</h2>
        <Subtitle className='textL'>
          We are dedicated to helping you succeed. Browse some of our support resources below.
        </Subtitle>
        <DataLoader
          status={support_status}
          data={support_items}
          emptyResultsMessage='At this time there are no support links'
          renderData={() => <CardContainer>{mappedSupportItems}</CardContainer>}
        />
      </SupportWrap>
    </div>
  );
}

export default SupportPage;
