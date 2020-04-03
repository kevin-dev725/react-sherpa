/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components';
import { toastLingerTime } from '../../helpers/variables';

const ShAlert = styled(Alert)`
  margin: var(--pad2) var(--pad2) var(--pad1) !important;
  transition: top 0.3s;
`;

const ToastComponent = ({ message, id, color }) => {
  const [show, setShow] = useState(true);

  const toggle = () => setShow(false);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => setShow(false), toastLingerTime);
    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  return (
    <ShAlert data-test='toast' color={color || 'success'} isOpen={show} toggle={toggle}>
      {message}
    </ShAlert>
  );
};

export default ToastComponent;
