import React, { useEffect, useState, useRef } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputGroupBorder from '../components/InputGroupBorder.jsx';
import AxiosInstance from '../axiosConfig';
import { getUserData } from '../store/Auth/selectors';
import { history } from '../history';
import { createCampaign } from '../store/Campaigns/thunks';
import Select from 'react-select';
import { resetCampaignListTabs } from '../store/uiStore/campaignsPageDesktopView/campaignsList/filterData/actions';
import { LoadingSpinner } from './LoadingSpinner.jsx';

const renderErrors = (errors) => {
  return (
    <div>
      <h4>Errors</h4>
      <ul>
        {Object.entries(errors).map(([field, errs]) => (<li key={field}>{field} : {`${errs.join(' ')}`}</li>))}
      </ul>
    </div>
  );
};

const StyledError = styled.span`
  color: var(--red);
  font-size: .9em;
  margin-top: .75em;
`;

const themeStyles = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    dangerLight: "black",
    danger: "white",
    primary: "var(--gray)",
    primary75: "var(--gray)",
    primary50: "var()"
  }

});

const selectStyles = {
  option: (provided) => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    border: "0",
    borderBottom: state.selectProps.error ? "2px solid var(--red)" : "2px solid var(--mediumGray)",
    borderRadius: "0",
    boxShadow: "none !important",

  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    stroke: "var(--sherpaBlue)",
    fill: "var(--sherpaBlue)"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "1rem 0",
    fontSize: "1.125rem",
    height: "calc(1.5em + 2rem)"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#B5B5B5"
  }),
  svg: (provided) => ({
    ...provided,
    color: "var(--sherpaBlue)",
    fill: "var(--sherpaBlue)"
  }),
  singleValue: (provided) => ({
    ...provided
  }),
}

const NewCampaignForm = (props) => {
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    watch,
    setError
  } = useForm(props.initialState);
  const [markets, setMarkets] = useState([]);
  const [zapierHooks, setZapierHooks] = useState([]);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = useSelector(getUserData);
  const watchAll = watch();
  const localState = useRef();
  const dispatch = useDispatch();

  const CustomDropdownIndicator = ({ innerProps, innerRef }) => (
    <FontAwesomeIcon icon="chevron-down" color="var(--sherpaBlue)" ref={innerRef} {...innerProps} />
  );

  // save current state of the app
  useEffect(() => {

    // localState is used to save the current state of the form in
    // case user X's out and later comes back. It is later use to
    // pre-fill the values
    localState.current = watchAll;
  }, [watchAll]);

  useEffect(() => {
    // we have to manually set the formValues, react-hook-forms doesn't allow
    // defaultValues to be set when refs aren't exposed directly
    setValue("name", props.initialState.name);
    setValue("podioPushEmailAddress", props.initialState.podioPushEmailAddress);
    setValue("market", props.initialState.market);
    setValue("userAccess", props.initialState.userAccess);
    setValue("zapierWebhook", props.initialState.zapierWebHook);
  }, [props.initialState]);

  const onSubmit = ({
    name = "",
    podioPushEmailAddress = "",
    market = {},
    zapierWebHook = {}
  }, e) => {
    e.preventDefault();
    const payload = {
      company: userData.company.id,
      createdBy: userData.id,
      priorityCount: 0,
      name: name,
      podioPushEmailAddress: podioPushEmailAddress,
      market: market.value,
      zapierWebHook: zapierWebHook.value
    };

    setIsSubmitting(true);
    dispatch(createCampaign(payload))
      .then(data => {
        setIsSubmitting(false);
        dispatch(resetCampaignListTabs());
        history.push(`/campaign/${data.id}/details`);
      })
      .catch(({ response }) => {
        setIsSubmitting(false);
        setNonFieldErrors(response.data.non_field_errors || []);
        Object.entries(response.data).forEach(([field, errors]) => {
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

  // during component-unmount save the state of the form
  // for later use
  useEffect(() => () => {
    props.saveFormState(localState.current);
  }, []);

  // NOTE: We may need to change these to dispatch to the store once
  // markets and zapierWebHooks become a resource we need to track on
  // redux.  It's currently not on store because it just adds a lot of
  // boilerplate.
  useEffect(() => {
    // fetch markets
    AxiosInstance
      .get('/markets/')
      .then(({ data }) => {
        setMarkets(data.results);
      });

    // fetch zapier-hooks
    AxiosInstance
      .get('/zapier-webhooks/')
      .then(({ data }) => {
        setZapierHooks(data.results);
      });
  }, []);

  const userAccessOptions = userData.company.profiles.map(
    profile => ({ value: profile.id, label: profile.user.fullName })
  );
  const webHookOptions = zapierHooks.map(
    hook => ({ value: hook.id, label: hook.name })
  );
  const marketOptions = markets.map(
    market => ({ value: market.id, label: market.name })
  );

  const handleAllChange = (fieldName) => (selectedOption) => {
    setValue(fieldName, selectedOption);
  };

  return (
    <div data-test="campaign-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row form>
          <Col xs="12" md="6">
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <InputGroupBorder error={errors.name}>
                <Input
                  name="name"
                  placeholder="Enter Campaign Name"
                  innerRef={register({ required: "Required", maxLength: { value: 255, message: "Exceeds max length of 255" } })}
                />
              </InputGroupBorder>
              <ErrorMessage errors={errors} name="name" as={<StyledError />} />
            </FormGroup>
          </Col>
          <Col xs="12" md="6">
            <FormGroup >
              <Label htmlFor="market">Markets</Label>
              <Select
                menuPlacement="auto"
                theme={themeStyles}
                error={errors.market}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: CustomDropdownIndicator
                }}
                styles={selectStyles}
                name="market"
                value={props.initialState.market}
                onChange={handleAllChange("market")}
                options={marketOptions}
                ref={() =>
                  register(
                    { name: "market" },
                    { required: "Required" }
                  )
                }
              />
              <ErrorMessage
                data-test="campaign-form-market-error"
                errors={errors}
                name="market"
                as={<StyledError />}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label htmlFor="podioPushEmailAddress">Podio Push Email Address(Optional)</Label>
              <InputGroupBorder>
                <Input
                  name="podioPushEmailAddress"
                  placeholder="Email Address"
                  innerRef={register({
                    pattern: {
                      value: /^\w+([\.-]?\w+)*([\+]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid Email"
                    }
                  })}
                />
              </InputGroupBorder>
              <ErrorMessage errors={errors} name="podioPushEmailAddress" as={<StyledError />} />
            </FormGroup>
          </Col>
          <Col xs="12" md="6">
            <FormGroup>
              <Label htmlFor="zapierWebHook">Select Zapier Webhook(Optional)</Label>
              <Select
                menuPlacement="auto"
                theme={themeStyles}
                error={errors.zapierWebHook}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: CustomDropdownIndicator
                }}
                styles={selectStyles}
                name="zapierWebHook"
                value={props.initialState.zapierWebHook}
                onChange={handleAllChange("zapierWebHook")}
                options={webHookOptions}
                ref={() =>
                  register(
                    { name: "zapierWebHook" }
                  )
                }
              />
              <ErrorMessage errors={errors} name="zapierWebhook" as={<StyledError />} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <FormGroup>
              <Label>User Access</Label>
              <Select
                menuPlacement="auto"
                theme={themeStyles}
                error={errors.userAccess}
                components={{
                  IndicatorSeparator: null,
                  DropdownIndicator: CustomDropdownIndicator
                }}
                styles={selectStyles}
                name="userAccess"
                isMulti
                value={props.initialState.userAccess}
                onChange={handleAllChange("userAccess")}
                options={userAccessOptions}
                ref={() =>
                  register(
                    { name: "userAccess" }
                  )
                }
              />
              <ErrorMessage errors={errors} name="userAccess" as={<StyledError />} />
            </FormGroup>
          </Col>
        </Row>
        {nonFieldErrors.length ? (
          <div style={{ textAlign: 'center' }}>
            {nonFieldErrors.map(error => (
              <StyledError>{error}</StyledError>
            ))}
          </div>
        ) : null}
        <Button color="primary" block size="lg" data-test="campaign-form-submit" type="submit" value="Submit">
          <LoadingSpinner
            isLoading={isSubmitting}
            color='white'
            size='1em'
            renderContent={() => "Create Campaign"}
          />
        </Button>
      </form>
    </div>
  );
};
export default NewCampaignForm;
