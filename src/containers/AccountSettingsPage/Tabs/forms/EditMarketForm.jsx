import React, { useState } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { Label, Input, FormGroup, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';

// component
import InputGroupBorder from '../../../../components/InputGroupBorder';
import { updateMarketThunk } from '../../../../store/Markets/actions';
import { useDispatch } from 'react-redux';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { addNewToast } from '../../../../store/Toasts/actions';

const StyledError = styled.span`
  color: var(--red);
  font-size: .9em;
  margin-top: .75em;
`;

// market form data
const market_form = [
  [
    {
      name: 'callForwardingNumber',
      label: 'Call Forwarding Number',
      component: Input,
      getComponentProps: (register) => ({
        name: 'callForwardingNumber',
        placeholder: 'Enter Number',
        innerRef: register({
          required: 'Required',
          validate: (value) => value.replace(/\D/g, '').length === 10 ? undefined : 'Must be 10 digits'
        })
      }),
      columnProps: {}
    }
  ]
];

const EditMarketForm = (props) => {
  const { errors, register, handleSubmit, setError } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = data;
    payload.callForwardingNumber = data.callForwardingNumber.replace(/\D/g, '');

    dispatch(updateMarketThunk(props.marketId, payload))
      .then(_ => {
        dispatch(addNewToast({ message: "Market Updated Successfully", color: "success" }));
        props.closeModal();
      })
      .catch(({ response: { data = {} } = {} }) => {
        setIsSubmitting(false);
        setNonFieldErrors(data.non_field_errors || []);
        Object.entries(data).forEach(([field, errors]) => {
          setError(
            errors.map(error => ({
              type: 'validate',
              name: field,
              message: error
            }))
          );
        });
      });
  };

  return (
    <div data-test="market-edit-form" >
      <form onSubmit={handleSubmit(onSubmit)}>
        {market_form.map((formRow, idx) => {
          return (
            <Row key={idx} form>
              {formRow.map((formCol, idy) => {
                const FormComponent = formCol.component;
                return (
                  <Col {...formCol.columnProps} key={idy}>
                    <FormGroup>
                      <Label htmlFor={formCol.name}>{formCol.label}</Label>
                      <InputGroupBorder >
                        <FormComponent {...formCol.getComponentProps(register)} />
                      </InputGroupBorder>
                      <ErrorMessage
                        data-test={`error-${formCol.name}`}
                        errors={errors}
                        name={formCol.name}
                        as={<StyledError />}
                      />
                    </FormGroup>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        {nonFieldErrors.length ? (
          <div style={{ textAlign: 'center' }}>
            {nonFieldErrors.map(error => (
              <StyledError>{error}</StyledError>
            ))}
          </div>
        ) : null}
        <Button
          color="primary"
          block
          size="lg"
          data-test="market-form-submit"
          type="submit"
          value="Submit"
        >
          <LoadingSpinner
            isLoading={isSubmitting}
            color='white'
            size='1em'
            renderContent={() => "Submit"}
          />
        </Button>
      </form>
    </div>
  );
};

export default EditMarketForm;
