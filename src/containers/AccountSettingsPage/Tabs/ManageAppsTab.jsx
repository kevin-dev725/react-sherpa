import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import Modal from '../../../components/Modal';
import SettingsSection from '../SettingsSection';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { CustomInput, Button, FormGroup, Label, Input, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO:  the kebab path will change when the unread messages branch is merged
import DesktopKebab from '../../DesktopCampaignsPage/DesktopKebab';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 0 20%;
      }
      &:nth-child(2) {
        flex: 1 0 60%;
      }
      &:nth-child(3) {
        flex: 0 0 50px;
        text-align: right;
      }
    }

    &.disabled {
      span {
        color: var(--gray);
      }
    }
  }
`;

function ManageAppsTab(props) {
  const [editModal, setEditModal] = useState(false);
  const toggle = () => setEditModal(!editModal);

  const plusIcon = <FontAwesomeIcon icon="plus" />

  // editModal
  const editModalNode = (
    <Modal isOpen={editModal} toggle={toggle} title="Edit Webhook">
      <FormGroup>
        <Label for="name">Name</Label>
        <InputGroupBorder>
          <Input placeholder="Enter the name" type="text" name="name"/>
        </InputGroupBorder>
      </FormGroup>
      <FormGroup>
        <Label for="url">URL</Label>
        <InputGroupBorder>
          <Input placeholder="Enter the URL" type="text" name="url"/>
        </InputGroupBorder>
      </FormGroup>
      <FormGroup row>
        <Col xs="3">
          <Label for="statusToggle">Active?</Label>
        </Col>
        <Col xs="9">
          <CustomInput
            type="switch"
            id="statusToggle"
          />
        </Col>
      </FormGroup>
      <Button className="mt-3" color="primary" block size="md">Save Changes</Button>
    </Modal>
  );

  // header buttons
  const manageAppsHeaderBtn = (
    <Button color="primary" size="md" onClick={()=>{}}>
      {plusIcon}
      Add Webhook
    </Button>
  );

  // header components
  const manageAppsHeader = (
    <SectionHeader
      title="Zapier Webhooks"
      btn={manageAppsHeaderBtn}
    />
  );

  const kebabActions = [
    {
      name: "Edit",
      onClick: toggle
    },
    {
      name: "Disable",
      onClick: () => {}
    }
  ];

  return (
    <>
      <SettingsSection type="list" header={manageAppsHeader}>
        <StyledList>
          <li className="item textM mb-1">
            <span className="fw-bold">Pueblo</span>
            <span className="gray">
              https://hooks.zapier.com/hooks/catch/67631/cnsx0v/
            </span>
            <span>
              <DesktopKebab idx="1" size="lg" actions={kebabActions}/>
            </span>
          </li>
          <li className="item textM mb-1">
            <span className="fw-bold">Colorado Springs</span>
            <span className="gray">https://hooks.zapier.com/hooks/catch/12344/sss3fw/</span>
            <span>
              <DesktopKebab idx="2" size="lg" actions={kebabActions}/>
            </span>
          </li>
        </StyledList>
      </SettingsSection>
      {editModalNode}
    </>
  );
}

export default ManageAppsTab;
