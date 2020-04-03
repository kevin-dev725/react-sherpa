import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToastComponent from './ToastComponent';
import { getToasts } from '../../store/Toasts/selectors';
import styled from 'styled-components';
import { emptyToastArray } from '../../store/Toasts/actions';
import { toastLingerTime } from '../../helpers/variables';

const Wrapper = styled.div`
  width: 100%;
  pointer-events: none;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  z-index: 10000;
  @media (min-width: 768px) {
    max-width: 500px;  
   }
* {
    pointer-events: all;
  }
`;

function ToastContainer() {
  const toasts = useSelector(getToasts);
  const mappedToasts = toasts.map(({ message, id, color }) => (
    <ToastComponent color={color} key={id} id={id} message={message} />
  ));

  const dispatch = useDispatch();

  // automatically clear toast array after last toast has faded away
  useEffect(() => {
    let timeout;
    toasts.length && (timeout = setTimeout(() => dispatch(emptyToastArray()), toastLingerTime + 400));
    return () => clearTimeout(timeout);
  }, [dispatch, toasts]);
  return <Wrapper>{mappedToasts}</Wrapper>;
}

export default ToastContainer;
