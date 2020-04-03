import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/sherpaLogo.png';
import InputGroupBorder from '../../components/InputGroupBorder.jsx';
import { Card, Input, Label, FormGroup, Button } from 'reactstrap';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const StyledCard = styled(Card)`
  padding: var(--ypad) var(--xpad);
  border-radius: var(--pad2) !important;

  @media (min-width: 768px) {
    padding: var(--pad6) var(--pad7);
  }
`;
const LogoHolster = styled.div`
  padding-bottom: var(--pad5);
  text-align: center;
`;
const CardHeader = styled.h1`
  margin-bottom: var(--pad5);
`;
const FullWidth = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
    max-width: 500px;
  }
  @media (min-width: 1700px) {
    width: 30%;
    max-width: 700px;
  }
`;
const Error = styled.p`
  color: var(--red);
  text-align: center;
  line-height: 1.2;
`;

export default function LoginForm(props) {
  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { submit, formError } = props;

  // onchange handlers
  const changeUsername = e => setUsername(e.target.value);
  const changePWHandler = e => setPassword(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    submit(username, password)
      .then(() => setSubmitting(false))
      .catch(_ => setSubmitting(false));
  };

  return (
    <FullWidth>
      <LogoHolster>
        <img src={logo} alt='Sherpa Logo' />
      </LogoHolster>
      <StyledCard className='text-center'>
        <CardHeader>Welcome back.</CardHeader>
        <div>
          <form className='text-left' onSubmit={onSubmit} data-test='login-form'>
            <FormGroup>
              <Label htmlFor='username'>Email</Label>
              <InputGroupBorder>
                <Input
                  name='username'
                  type='email'
                  value={username}
                  onChange={changeUsername}
                  placeholder='Enter email address'
                  required
                />
              </InputGroupBorder>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <InputGroupBorder>
                <Input
                  name='password'
                  type='password'
                  value={password}
                  onChange={changePWHandler}
                  placeholder='Enter Password'
                  required
                />
              </InputGroupBorder>
            </FormGroup>
            {formError ? <Error data-test='login-form-error'>{formError}</Error> : null}
            <Button
              className='mt-4'
              block
              size='lg'
              color='primary'
              type='submit'
              disabled={!username || !password}
            >
              <LoadingSpinner isLoading={submitting} color='light' renderContent={() => <>Log In</>} />
            </Button>
          </form>
        </div>
      </StyledCard>
    </FullWidth>
  );
}
