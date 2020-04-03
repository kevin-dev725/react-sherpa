import React from 'react';

export default function MainInfo(props) {
  const { propertyAddress, propertyCity, propertyState, propertyZip } = props.addressData;
  const address2ndLine = `${propertyCity}, ${propertyState} ${propertyZip}`;
  return (
    <span>
      <span>{propertyAddress} <br /> {address2ndLine}</span>
    </span>
  );
}
