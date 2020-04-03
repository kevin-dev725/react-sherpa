import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Col,
  Row,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import { CalloutBlock } from '../../CampaignDetailsPage/SendTab/CalloutSection';
import IconBg from '../../../components/IconBg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// utils
import { getCampaignStats } from '../../../store/CampaignStatsStore/selectors';
import { fetchCampaignStatsThunk } from '../../../store/CampaignStatsStore/thunk';

const SimpleList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  flex: 1 1 auto;

  li {
    flex: 1 1 auto;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 4px;
  padding: ${props => props.list ? 0 : "var(--pad3)"};
  margin-bottom: ${props => props.list ? "0" : "var(--pad2)"};
  display: flex;
  flex-direction: column;
  height: ${props => props.list ? "100%" : "auto"};
  box-shadow: 0 0 15px -10px #525252;

  .header {
    padding: var(--pad3) var(--pad3);
  }

  .item {
    padding: .8rem var(--pad3);
    border-top: 2px solid var(--lightGray);
    align-items: center;
    justify-content: space-between;
    display: flex;

    .icon {
      flex: 0 1 auto;
      margin-right: .8rem;
    }

    .name {
      flex: 1 0 auto;
      text-align: left;
    }
  }
`;

const circleSize = "2rem";
const iconSize = "sm";
const addIcon = <FontAwesomeIcon icon="plus-circle" size="xl" color="var(--green)" className="mr-1" />;
const downloadIcon = <Button className="p-0" color="link"><FontAwesomeIcon icon="download" className="ml-2" color="var(--sherpaBlue)" style={{ fontSize: ".75rem" }} /></Button>;

const CampaignMetricsSection = () => {
  const { id } = useParams();
  const campaignStats = useSelector(getCampaignStats(parseInt(id)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (campaignStats.health === undefined) {
      // fetch campaign stats if not already in the store
      dispatch(fetchCampaignStatsThunk(id));
    }
  }, []);

  return (
    <>
      <h2 className="fw-bold mb-3">Campaign Metrics</h2>
      <Row>
        <Col>
          <Row>
            <Col xs="12">
              <Card className="text-center">
                <h2 className="m-0 fw-regular">{addIcon}List Health: <span className="fw-black">{campaignStats.health}</span></h2>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CalloutBlock color="yellow" value={campaignStats.totalSmsSentCount}>SMS Sent</CalloutBlock>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CalloutBlock color="purple" value={`${campaignStats.deliveryRate}%`}>Delivery Rate</CalloutBlock>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CalloutBlock color="green" value={`${campaignStats.responseRate}%`}>Response Rate</CalloutBlock>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
                <CalloutBlock color="green" value={campaignStats.totalResponses}>Total Responses</CalloutBlock>
              </Card>
            </Col>
            <Col xs="6">
              <Card className="m-0">
                <CalloutBlock color="sherpaBlue" value={campaignStats.totalLeads}>New Leads</CalloutBlock>
              </Card>
            </Col>
            <Col xs="6">
              <Card className="m-0">
                <CalloutBlock color="sherpaBlue" value={campaignStats.totalProspects}>Total Prospects</CalloutBlock>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card list>
            <h4 className="header fw-black textXL m-0">Message Stats</h4>
            <SimpleList className="p-0">
              <li className="item textM">
                <IconBg className="icon" color="yellow" icon="times" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Daily Send Limit</span>
                <span className="value fw-black textXL">{campaignStats.dailySendLimit}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="yellow" icon="paper-plane" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Sends Available</span>
                <span className="value fw-black textXL">{campaignStats.totalSendsAvailable}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="orange" icon="share" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Skipped</span>
                <span className="value fw-black textXL">{campaignStats.totalSkipped}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="red" icon="phone-slash" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Undeliverable</span>
                <span className="value fw-black textXL">{campaignStats.totalInitialSmsUndelivered}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="red" icon="skull" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Auto Dead Rate</span>
                <span className="value fw-black textXL">{`${campaignStats.autoDeadPercentage}%`}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="red" icon="skull" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Total Auto Dead</span>
                <span className="value fw-black textXL">{campaignStats.totalAutoDeadCount}</span>
              </li>
            </SimpleList>

          </Card>
        </Col>
        <Col>
          <Card list>
            <h4 className="header fw-black textXL m-0">Import Stats</h4>
            <SimpleList className="p-0">
              <li className="item textM">
                <IconBg className="icon" color="green" icon="address-book" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Phone Numbers</span>
                <span className="value fw-black textXL">{campaignStats.phoneNumberCount}</span>
                <span>{downloadIcon}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="green" icon="mobile-alt" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Mobile</span>
                <span className="value fw-black textXL">{`${campaignStats.totalMobile}`}</span>
                <span>{downloadIcon}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="green" icon="phone" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Landline</span>
                <span className="value fw-black textXL">{campaignStats.totalLandline}</span>
                <span>{downloadIcon}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="green" icon="question" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Other Phone</span>
                <span className="value fw-black textXL">{campaignStats.totalPhoneOther}</span>
                <span>{downloadIcon}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="red" icon="gavel" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">Litigators Removed</span>
                <span className="value fw-black textXL">{`${campaignStats.totalLitigators}`}</span>
                <span>{downloadIcon}</span>
              </li>
              <li className="item textM">
                <IconBg className="icon" color="red" icon="phone-slash" faSize={iconSize} width={circleSize} height={circleSize} />
                <span className="name">DNC Skipped</span>
                <span className="value fw-black textXL">{campaignStats.totalDncCount}</span>
                <span>{downloadIcon}</span>
              </li>
            </SimpleList>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CampaignMetricsSection;
