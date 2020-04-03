import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/Auth/actions';
import { authError, isAuthenticated } from '../../store/Auth/selectors';

import styled from 'styled-components';
import bg from '../../assets/images/loginBG.jpg';
import LoginForm from './LoginForm';

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pad3);

  @media (min-width: 768px) {
    align-items: flex-end;
    padding: var(--pad8);
  }
`;

export default function LoginPage(props) {
  const formError = useSelector(authError);
  const is_authenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  // redirect if authenticated
  if (is_authenticated) return <Redirect to="/" />;

  // submit handler
  const submit = (username, password) => {
    return dispatch(authenticate(
      { username, password },
      () => props.history.push('/')
    )).then(() => {
      props.history.push('/');
      return null;
    });
  };

  return (
    <PageWrapper bg={bg}>
      <LoginForm submit={submit} formError={formError} />
    </PageWrapper>
  );
}
