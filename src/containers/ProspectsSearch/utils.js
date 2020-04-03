import React from 'react';
import MainInfo from './MainInfo';
import { IListItem } from '../../components/List/utils';
import StatusWrapper from './StatusWrapper';

/*
 * Helper functions to transform a prospect to an appropriate
 * interface for the =ItemList= component to render.
 */

export const prospectToItemList = prospect => {
  const {
    id,
    name,
    phoneDisplay,
    propertyAddress,
    propertyCity,
    propertyState,
    propertyZip,
    leadStageTitle
  } = prospect;

  let addressData = {
    propertyAddress,
    propertyCity,
    propertyState,
    propertyZip
  };

  return {
    ...IListItem,
    name,
    subInfo: phoneDisplay,
    mainInfo: <MainInfo addressData={addressData} />,
    statusWrapper: (
      <StatusWrapper
        link={{ pathname: `/prospect/${id}/details`, state: { backButtonText: "Prospect List" } }}
        status={leadStageTitle}
      />
    )
  };
};

export const prospectsToItemList = prospects => prospects.map(prospectToItemList);
