import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styled from 'styled-components';

const Heading = styled(ModalHeader)`
  background: var(--tealBlueGradient);
  color: white;
  padding-left: var(--pad3) !important;
  padding-right: var(--pad3) !important;
  font-weight: 700 !important;

  .close {
    color: white;
    opacity: 1;
    font-weight: 900;
    font-size: 2rem;
  }
`;

const Body = styled(ModalBody)`
  padding: var(--pad3) var(--pad3) !important;
`;

function Shmodal(props) {
  const { children, title, isOpen, toggle } = props;

  return (
    <Modal isOpen={isOpen} data-test={props.dataTest}>
      <Heading tag='h3' toggle={toggle}>
        {title}
      </Heading>
      <Body>{children}</Body>
    </Modal>
  );
}

export default Shmodal;
