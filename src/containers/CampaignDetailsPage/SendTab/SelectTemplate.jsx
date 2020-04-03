import React from 'react';
import styled from 'styled-components';
import InputSelect2 from '../../../components/InputSelect2';
import { Label, DropdownItem } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate(props) {
  const { templateChoices, templateId, choseTemplate } = props;

  const templateOptions = Object.entries(templateChoices).map(([key, value]) => (
    <DropdownItem   onClick={choseTemplate} key={key} value={value.id}>
      {value.templateName}
    </DropdownItem>
  ));

  const msg = templateChoices[templateId] && templateChoices[templateId].message ? templateChoices[templateId].message : '';

  return (
    <PaddedContent data-test='sms-template-dropdown'>
      <Label htmlFor='SearchField'>Template</Label>
      <InputSelect2
        id='SearchField'
        value={templateChoices[templateId] && templateChoices[templateId].templateName ? templateChoices[templateId].templateName : null}
        placeholder="Search"
        options={templateOptions}
      />

      <Preview message={msg} />
    </PaddedContent>
  );
}

export default SelectTemplate;
