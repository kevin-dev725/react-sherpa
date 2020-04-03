import React from 'react';
import styled from 'styled-components';
import InputGroupBorder from '../../../components/InputGroupBorder';
import {
  Button,
  Label,
  Input,
  FormGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewSend from '../../CampaignDetailsPage/SendTab/ReviewSend';

const Textarea = styled(Input)`
  background: var(--white) !important;
  box-shadow: 0 0 10px -7px #000000a1;
  margin-top: var(--pad3);
  padding: var(--pad2) var(--pad3) !important;
  line-height: 1.6 !important;
`;

const ProgressBar = styled.div`
  --barsize: 1rem;
  --rad: ${props => props.percent === 100 ? "0" : "var(--barsize)"};
  text-align: center;
  font-weight: bold;
  font-size: .9rem;
  padding-bottom: 1rem;
  border-bottom: var(--barsize) solid var(--lightGray);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: ${props => props.percent}%;
    height: var(--barsize);
    bottom: calc(0px - var(--barsize));
    left: 0;
    background: var(--sherpaBlue);
    border-top-right-radius: var(--rad);
    border-bottom-right-radius: var(--rad);
    transition: width .3s;
  }

  .count {
    color: var(--sherpaBlue);
    font-size: 1.3em;
    font-weight: 900;
    padding: 0 .2em;
  }
  .outOf {
    color: var(--gray);
    font-weight: 400;
  }
`;

const Wrapper = styled.div`
  --border: 2px solid var(--mediumGray);
  --padding: var(--pad3) var(--xpad);
  --inYpad: var(--pad3);

  display: flex;
  flex-direction: row;
  height: 100%;

  & > section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    & > h3 {
      padding: var(--padding);
      border-bottom: var(--border);
    }
  }

  .template__content {
    display: flex;
  }

  .template__select {
    padding: var(--inYpad) var(--xpad);
    border-right: var(--border);
    flex-basis: 40%;
    max-width: 400px;

    li {
      --ypad: .75em;
      padding: var(--ypad) 0;
      font-weight: bold;
      --bg: var(--ghostBlue);
      position: relative;
      z-index: 1;

      &:before {
        content: '';
        position: absolute;
        width: calc(100% + var(--xpad) + var(--xpad));
        height: 100%;
        top: 0;
        left: calc( 0px - var(--xpad) );
        z-index: -9;
        background: var(--bg);
      }

      &:hover {
        --bg: var(--mediumGray);
      }
      &:active,
      .active {
        --bg: var(--sherpaBlue);
        color: white;
      }
    }
  }
  .template__form {
    padding: var(--inYpad) var(--xpad);
    flex: 60% 1 0;
  }
  .dynamicFieldSection {
    padding: var(--pad1) var(--pad3);
    background: var(--white);
  }
  .dynamicFields {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .dynamicField {
      background: var(--highlight);
      padding: 2px 5px;
      margin-right: .8em;
      margin-bottom: .8em;

      &:before {content:"{"}
      &:after {content:"}"}
    }
  }
`;

const TemplateSection = styled.section`
  flex-basis: 60%;
  background: var(--ghostBlue);
`;

const ReviewSendSection = styled.section`
  flex-basis: 40%;
  background: var(--white);
`;

const CampaignSendTab = props => {

  const addIcon = (
    <FontAwesomeIcon icon="plus-circle" className="mr-1"/>
  );

  const checkIcon = (
    <FontAwesomeIcon icon="check-circle" className="mr-1" color="var(--green)"/>
  );

  return (
    <Wrapper>
      <TemplateSection>
        <h3 className="m-0">Select Template</h3>
        <div className="template__content">
          <div className="template__select">
            <InputGroupBorder>
              <Input placeholder="Search 46 Templates"/>
            </InputGroupBorder>
            <ul className="p-0 mt-3">
              <li className="textS">{addIcon}Create New Template</li>
              <li className="textS">Initial Message Template</li>
              <li className="textS">Did I reach the right person?</li>
              <li className="textS">Interested in selling?</li>
              <li className="textS">Foreclosure Test A</li>
              <li className="textS">Foreclosure Test B</li>
              <li className="textS">Foreclosure Test c</li>
              <li className="textS">Deceased - Family A</li>
              <li className="textS">Deceased - Family B</li>
              <li className="textS">Deceased - Family C</li>
            </ul>
          </div>
          <div className="template__form">
            <FormGroup>
              <Label>Template Name</Label>
              <InputGroupBorder className='mb-2'>
                <Input placeholder="Name Your Template" />
              </InputGroupBorder>
            </FormGroup>
            <div className="dynamicMsg mt-3">
              <div className="d-flex justify-content-between">
                <Label for="templateText">{checkIcon} Message Analysis</Label>
                <span className="charCount">142/160 Characters</span>
              </div>
              <FormGroup>
                <Textarea className="textS mt-2" rows="4" type="textarea" name="text" id="templateText" />
                {
                  // disabled bc there is no toggling yet until emojis are introduced
                }
                <Button color="secondary" block size="lg" disabled className="no-br o-100">Dynamic Fields</Button>
                <div className="dynamicFieldSection">
                  <span className="gray textS">Drag-and-drop dynamic fields to your message.</span>
                  <ul className="dynamicFields p-0 mt-2 mb-0">
                    <li className="dynamicField textS">First Name</li>
                    <li className="dynamicField textS">Last Name</li>
                    <li className="dynamicField textS">Street Address</li>
                    <li className="dynamicField textS">City</li>
                    <li className="dynamicField textS">State</li>
                    <li className="dynamicField textS">Zip</li>
                    <li className="dynamicField textS">Custom</li>
                  </ul>
                </div>
                <Button color="primary" size="md" className="align-self-end mt-3 float-right">Save and Use Template</Button>
              </FormGroup>
            </div>
          </div>
        </div>
      </TemplateSection>

      <ReviewSendSection>
        <h3>Review & Send Messages</h3>
        <ProgressBar percent={37}>
          Send Count: <span className="count">2,505</span><span className="outOf">/ 6,035</span>
        </ProgressBar>
        <ReviewSend />
      </ReviewSendSection>
    </Wrapper>
  );
};

export default CampaignSendTab;
