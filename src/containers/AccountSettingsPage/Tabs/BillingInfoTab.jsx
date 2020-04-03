import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import InputSelect from '../../../components/InputSelect2';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col, Button, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BillingInfoTab(props) {
  // header buttons
  const billingHeaderBtn = (
    <Button color="primary" size="md" onClick={()=>{}}>
      Save Changes
    </Button>
  );

// header components
  const billingHeader = (
    <SectionHeader
      title="Billing Info"
      btn={billingHeaderBtn}
    />
  );

  const states = (
    <>
      <DropdownItem>California</DropdownItem>
      <DropdownItem>An inferior State</DropdownItem>
    </>
    );

  return (
    <>
      <SettingsSection type="form" header={billingHeader}>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label className="required" for="name">Name</Label>
                <InputGroupBorder>
                  <Input id="name" required placeholder="Name on card" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="required" for="address">Address</Label>
                <InputGroupBorder>
                  <Input id="address" required placeholder="Billing Address" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label className="required" for="city">City</Label>
                <InputGroupBorder>
                  <Input id="city" required placeholder="Billing City" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="required" for="state">State</Label>
                <InputSelect
                  id="state"
                  required
                  placeholder="Billing State"
                  options={states}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="required" for="zip">Zip</Label>
                <InputGroupBorder>
                  <Input id="zip" required placeholder="Billing Zip" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label className="required" for="cardNum">Card Number</Label>
                <InputGroupBorder>
                  <Input id="cardNum" required placeholder="Your card number" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="required" for="expiration">Expiration</Label>
                <InputGroupBorder>
                  <Input id="expiration" required placeholder="mm/yy" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="required" for="cvc">CVC</Label>
                <InputGroupBorder>
                  <Input id="cvc" required placeholder="Card CVC" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </SettingsSection>
    </>
  );
}

export default BillingInfoTab;
