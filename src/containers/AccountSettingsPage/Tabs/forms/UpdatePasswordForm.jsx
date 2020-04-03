
import React, { useState } from 'react';
import InputGroupBorder from '../../../../components/InputGroupBorder';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useForm, ErrorMessage } from 'react-hook-form';
import styled from 'styled-components';
import { updatePassword } from '../utils';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { addNewToast } from '../../../../store/Toasts/actions';
import { generalNetworkError } from '../../../../helpers/variables';

const StyledError = styled.div`
  color: var(--red);
  font-size: .9em;
  margin-top: .75em;
  width: 100%;
  div {
    text-align: center;
    margin: 1rem 0;
    margin-top: 1.5rem;
  }
`;

function UpdatePasswordModal(props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const { handleSubmit, errors, register, getValues } = useForm();

  const handleValidate = confirmPassword => {
    const { currentPassword, newPassword } = getValues();
    if (confirmPassword === currentPassword) {
      return "New password must be different from current password.";
    }
    if (confirmPassword !== newPassword) {
      return "New passwords do not match.";
    }
  }

  const onSubmit = body => {
    setIsUpdating(true);
    updatePassword(body).then(res => {
      setIsUpdating(false);
      props.toggle();
    }).catch(({ response }) => {
      let errorMessage = generalNetworkError;
      if (response && response.data) {
        errorMessage = Object.values(response.data)[0][0] || generalNetworkError;
      }
      setErrorMessage(errorMessage);
      setIsUpdating(false);
    });
  }

  const passParams = {
    required: {
      value: true,
      message: 'Required'
    },
    minLength: {
      value: 8,
      message: "Must be a minimum of 8 characters in length"
    },
    validate: handleValidate
  }

  const currentPassRef = register({ required: passParams.required });
  const newPasswordRef = register({ ...passParams });
  const confirmPasswordRef = register({ ...passParams });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup >
        <Label htmlFor="currentPassword">Current Password</Label>
        <InputGroupBorder error={errors.currentPassword}>
          <Input data-test="change-password-input" placeholder="Enter current password" innerRef={currentPassRef} type="password" name="currentPassword" />
        </InputGroupBorder>
        <ErrorMessage errors={errors} name="currentPassword" as={<StyledError />} data-test="password-validation-error-message" />
      </FormGroup>
      <FormGroup >
        <Label htmlFor="newPassword">New Password</Label>
        <InputGroupBorder error={errors.newPassword}>
          <Input data-test="change-password-input" placeholder="Enter new password" innerRef={newPasswordRef} type="password" name="newPassword" />
        </InputGroupBorder>
        <ErrorMessage errors={errors} name="newPassword" as={<StyledError />} data-test="password-validation-error-message" />
      </FormGroup>
      <FormGroup >
        <Label htmlFor="confirmPassword">Confirm new Password</Label>
        <InputGroupBorder error={errors.confirmPassword}>
          <Input placeholder="Confirm new password" data-test="change-password-input" innerRef={confirmPasswordRef} type="password" name="confirmPassword" />
        </InputGroupBorder>
        <ErrorMessage errors={errors} name="confirmPassword" as={<StyledError />} data-test="password-validation-error-message" />
        <StyledError data-test='password-validation-api-error' centered={true}><div>{errorMessage}</div></StyledError>
        <Button data-test="submit-new-password-btn" color='primary' size='lg' block className='mt-4'>
          <LoadingSpinner isLoading={isUpdating} renderContent={() => "Confirm"} />
        </Button>
      </FormGroup>
    </form>
  );
}

export default UpdatePasswordModal;
