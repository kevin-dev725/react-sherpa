import React from 'react';
import styled from 'styled-components';
import StatusButtons from './StatusSection';
import Fields from './FieldsSection';
import { useSelector } from 'react-redux';
import { activeProspectSelector, actionBtnStatusSelector } from '../../../store/uiStore/prospectDetailsView/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';

const Section = styled.div`
  padding-left: var(--pad3);
  padding-right: var(--pad3);
  &:not(:last-child) {
    border-bottom: 1px solid var(--mediumGray);
  }
`;
const StatusSection = styled(Section)`
  padding-top: var(--pad1);
  padding-bottom: var(--pad3);
`;

const PaddedSection = styled(Section)`
  padding-top: var(--pad4);
  padding-bottom: var(--pad4);
`;

const DetailsTab = () => {
  const prospectId = useSelector(activeProspectSelector);
  const prospect = useSelector(getProspect(prospectId));
  const actionBtnStatus = useSelector(actionBtnStatusSelector);

  const {
    isQualifiedLead = false,
    isPriority = false
  } = prospect;

  const statusList = [
    {
      text: 'Priority',
      color: 'orange',
      icon: 'bolt',
      active: isPriority,
      attr: 'isPriority',
      status: actionBtnStatus.isPriority
    },
    {
      text: 'Qualified',
      color: 'purple',
      icon: 'star',
      active: isQualifiedLead,
      attr: 'isQualifiedLead',
      status: actionBtnStatus.isQualifiedLead
    }
  ];

  return (
    <>
      <StatusSection>
        <StatusButtons prospect={prospect} statusList={statusList} />
      </StatusSection>

      <PaddedSection>
        <Fields />
      </PaddedSection>
    </>
  );
};

export default DetailsTab;
