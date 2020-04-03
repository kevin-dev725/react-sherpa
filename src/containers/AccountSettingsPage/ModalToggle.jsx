import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Modal from '../../components/Modal';

function ModalToggle(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let betterChild = React.cloneElement(props.children, {onClick: toggle});

  let onclick = () => {
    props.config.onSubmit();
    toggle();
  };

  return (
    <>
      {betterChild}
      <Modal isOpen={modal} fade={props.config.fade} toggle={toggle} title={props.config.title} data-test='filter-modal'>
        {props.config.inner}
        {props.config.btnTxt && (
          <Button color='primary' size='lg' block className='mt-4' onClick={onclick}>
            {props.config.btnTxt}
          </Button>
        )}
      </Modal>
    </>
  );
}

export default ModalToggle;
