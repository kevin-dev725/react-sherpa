import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputGroupBorder from '../../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col } from 'reactstrap';
import InputSelect from '../../../../components/InputSelect3';
// import { countries } from 'moment-timezone/data/meta/latest.json';
import { timezones } from '../../../../helpers/variables';
import { getUserData } from '../../../../store/Auth/selectors';
import { updateTimezone } from '../utils';
import { addNewToast } from '../../../../store/Toasts/actions';
import { setUserInfo } from '../../../../store/Auth/actions';


const StyledInput = styled(Input)`
  &:disabled {
    cursor: unset;
    opacity: .6;
  }
`;

function SettingsForm(props) {
  const userData = useSelector(getUserData);
  const { email, company: { name: company, timezone, id } } = userData;
  const [timezoneSelected, setTimezoneSelected] = useState({ value: timezone || "", label: timezone || "" });

  const dispatch = useDispatch();

  // const getZones = country => (countries[country] && countries[country].zones) || [];

  const handleChange = (newZone) => {
      const zone = newZone.value;
      if (zone !== timezone) {
        setTimezoneSelected({ value: newZone.value, label: newZone.value });
        const body = { timezone: zone };
        const newData = {
          ...userData,
          company: {
            ...userData.company,
            timezone: zone
          }
        }
        dispatch(addNewToast({ message: "Company timezone has been updated", color: "success" }));
        dispatch(setUserInfo(newData));
        updateTimezone(id, body, userData).catch(() => {
          dispatch(setUserInfo(userData));
          setTimezoneSelected({ value: timezone, label: timezone });
        });
      }
  }

  const mapTimeZones = timezones.map(zone => ({ value: zone, label: zone }));

  return (
    <Form>
        <Row form>
            <Col md={4}>
                <FormGroup >
                <Label>Business Name</Label>
                <InputGroupBorder readonly>
                  <StyledInput placeholder="Enter a company name" disabled={true} data-test='user-company-setting' value={company} plaintext/>
                </InputGroupBorder>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                <Label>Email</Label>
                <InputGroupBorder readonly>
                  <StyledInput placeholder="Enter an email" disabled={true} data-test='user-email-settings' value={email} plaintext/>
                </InputGroupBorder>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup data-test='timezone-dropdown'>
                  <Label htmlFor="time-zone-select">Time Zone</Label>
                  <InputSelect
                    name="time-zone-select"
                    placeholder="Select a timezone"
                    defaultValue={timezoneSelected}
                    value={timezoneSelected}
                    options={mapTimeZones}
                    onChange={handleChange}
                  />
                </FormGroup>
            </Col>
        </Row>
    </Form>
  );
}

export default SettingsForm;
