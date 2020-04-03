import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BillingOrdersTab(props) {
  const downIcon =
    <FontAwesomeIcon icon="chevron-up" size="sm" className="mr-1" rotation={180} />;

  // header buttons
  const billingHeaderBtn = (
    <Button color="primary" size="sm" onClick={()=>{}}>
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

  const ordersHeader = (
    <SectionHeader
      title="Order History"
    />
  );

  return (
    <>
      <SettingsSection type="form" header={billingHeader}>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Name</Label>
                <InputGroupBorder>
                  <Input placeholder="Name on card" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Address</Label>
                <InputGroupBorder>
                  <Input placeholder="Billing Address" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>City</Label>
                <InputGroupBorder>
                  <Input placeholder="Billing City" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>State</Label>
                <InputGroupBorder>
                  <Input placeholder="Billing State" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Zip</Label>
                <InputGroupBorder>
                  <Input placeholder="Billing Zip" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Card Number</Label>
                <InputGroupBorder>
                  <Input placeholder="Card Number" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Expiration</Label>
                <InputGroupBorder>
                  <Input placeholder="00/0000" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>CVC</Label>
                <InputGroupBorder>
                  <Input placeholder="Card CVC" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </SettingsSection>

      <SettingsSection type="list" rows={4} header={ordersHeader}>
        <ul className="p-0">
          <li className="item header">
            <span>{downIcon}Order Number</span>
            <span>{downIcon}Date</span>
            <span>Card</span>
            <span>{downIcon}Total Charged</span>
          </li>

          <li className="item textS mb-1">
            <span>29432-932</span>

            <span className="gray">
              10/21/2019
            </span>

            <span>1234</span>

            <span>$259.56</span>
          </li>

          <li className="item textS mb-1">
            <span>29432-932</span>

            <span className="gray">
              10/21/2019
            </span>

            <span>1234</span>

            <span>$259.56</span>
          </li>

          <li className="item textS mb-1">
            <span>29432-932</span>

            <span className="gray">
              10/21/2019
            </span>

            <span>1234</span>

            <span>$259.56</span>
          </li>

          <li className="item textS mb-1">
            <span>29432-932</span>

            <span className="gray">
              10/21/2019
            </span>

            <span>1234</span>

            <span>$259.56</span>
          </li>
        </ul>
      </SettingsSection>
    </>
  );
}

export default BillingOrdersTab;
