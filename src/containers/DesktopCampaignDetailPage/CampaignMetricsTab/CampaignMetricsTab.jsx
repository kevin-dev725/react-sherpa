import React from 'react';
import styled from 'styled-components';

// components
import BatchStatsSection from './BatchStatsSection';
import CampaignMetricsSection from './CampaignMetricsSection';


const Wrapper = styled.div`
  --border: 2px solid var(--mediumGray);
  --padding: var(--ypad) var(--xpad);
  --inYpad: var(--pad3);

  padding: var(--padding);

  display: flex;
  flex-direction: column;

  section {
    margin-bottom: var(--ypad);
  }
`;

const Section = styled.div`
  margin-bottom: var(--pad5);

  ul {
    padding: 0;
  }

  .item {
    background: white;
    padding: 1.2rem var(--pad3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(.header):hover {
      background: var(--sherpaBlue);
      color: white !important;
    }

    &.header {
      padding: var(--pad1) var(--pad3);
      background: none;

      span:hover {
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
`;
const CampaignSendTab = props => {
  return (
    <Wrapper>
      <section>
        <CampaignMetricsSection />
      </section>

      <Section>
        <BatchStatsSection />
      </Section>
    </Wrapper>
  );
};

export default CampaignSendTab;
