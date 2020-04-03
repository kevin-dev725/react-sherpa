import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextBtn from '../../../components/TextBtn';
import Icon from '../../../components/Icon';
import zillow from '../../../assets/images/zillow.gif';
import { getZillowData } from '../../../store/ProspectDetails/details/actions';
import { useSelector } from 'react-redux';
import {
  prospectDetailsData
} from '../../../store/ProspectDetails/details/selectors';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

// NOTE: Deprecated Component -- Remains on the repo until the rework
// for zillow is in place.

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  .imgSection {
    margin-right: var(--pad3);
    position: relative;
  }

  .Info {
    flex-basis: auto;
    flex-grow: 1;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .title {
    margin-bottom: .5em;
  }

  .callouts {
    span:not(:last-child) {
      padding-right: var(--pad1);
      margin-right: var(--pad1);
      border-right: 1px solid var(--mediumGray);
    }
  }
`;

const ImgHolster = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: var(--pad2);
  padding: 0;
  background: white;
  top: 0;
  left: 0;

  img {
    margin-right: 0;
  }

`;

const Section = styled.div`
  padding-left: var(--pad3);
  padding-right: var(--pad3);
  &:not(:last-child) {
    border-bottom: 1px solid var(--mediumGray);
  }
`;

const PaddedSection = styled(Section)`
  padding-top: var(--pad4);
  padding-bottom: var(--pad4);
`;

const ZillowSection = (props) => {
  const [zillowData, setZillowData] = useState(null);
  const [isLoading, toggleIsLoading] = useState(true);
  const {
    id,
    propertyAddress,
    propertyCity,
    propertyState,
    propertyZip
  } = useSelector(prospectDetailsData);

  // get zillow stuff
  useEffect(() => {
    if (!zillowData) {
      getZillowData(id)
        .then(response => {
          toggleIsLoading(false);
          setZillowData(response.data);
        })
        .catch(error => toggleIsLoading(false));
    }
  }, [id, zillowData]);

  return (
    <>
      {zillowData || isLoading ?
        (<PaddedSection>
          <LoadingSpinner
            isLoading={isLoading}
            renderContent={
              () => (
                <Wrapper>
                  <div className="imgSection">
                    <img src={zillowData.image || ""} alt="house" />
                    <ImgHolster>
                      <img src={zillow} alt="provided by zillow" width="75" />
                    </ImgHolster>
                  </div>

                  <Info className="Info">
                    <p className="title textL fw-bold">{propertyAddress}<br />{`${propertyCity}, ${propertyState} ${propertyZip}`} </p>
                    <p className="callouts textS darkGray">
                      <span>{zillowData.bedrooms} beds</span>
                      <span>{zillowData.bathrooms} bath</span>
                      <span>{zillowData.sqFt.toLocaleString()} sqft</span>
                    </p>
                    <p className="estimate">
                      <span className="textS fw-bold blue mr-1">Zestimates<sup>&reg;</sup>:</span>
                      <span className="textM fw-bold">${parseInt(zillowData.zestimate).toLocaleString()}</span>
                    </p>
                    <TextBtn color="sherpaBlue" href="#" className="text-left textM align-center"><Icon name="zillow" margin="mr-2" />View on Zillow</TextBtn>

                  </Info>
                </Wrapper>
              )
            }
          />
        </PaddedSection>) : null
      }
    </>
  );
}

export default ZillowSection;
