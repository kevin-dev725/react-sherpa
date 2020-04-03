import React from 'react';
import DesktopCallouts from './DesktopCallouts';
import DesktopKebab from '../DesktopCampaignsPage/DesktopKebab';
import { IListItem } from '../../components/List/utils';
import { Button } from 'reactstrap';
import WithPermissions from '../../components/WithPermissions';
import { NUMBER_MANAGER_VIEW_KEBAB } from '../../permissions/phoneNumberManager';
import { getIn, all, any } from '../../utils';
import store from '../../store/store';
import { release_phone_number, updatePhoneStatus } from '../../store/NumberManagerStore/thunks';
/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const numberToItemList = number => {
  const {
    id, parsedCreated, phone,
    market, status, parsedLastSend,
    parsedLastReceived
  } = number;
  const subInfoStr = market.name;
  const kebabActions = [
    {
      name: status === 'active' ? 'Deactivate' : 'Reactivate',
      data: {
        onClick: () => store.dispatch(updatePhoneStatus({ ...number, market: market.id }, { status: status === 'active' ? 'inactive' : 'active' })),
        color: 'link'
      },
      component: Button
    }
    ,
    {
      name: 'Release',
      data: {
        onClick: () => store.dispatch(release_phone_number({ ...number, market: market.id })),
        color: 'link'
      },
      component: Button
    }
  ];

  return {
    ...IListItem,
    id,
    name: phone,
    subInfo: subInfoStr,
    desktopCallouts: (
      <DesktopCallouts
        data={{ status, parsedCreated, parsedLastSend, parsedLastReceived }}
      />),
    desktopKebab: (
      <WithPermissions
        checkPermissions={true}
        permission={NUMBER_MANAGER_VIEW_KEBAB}
        checkRole={true}
      >
        <DesktopKebab disabled={status === 'released'} idx={id} >
          {kebabActions.map((action, idx) => {
            const Component = action.component;
            return (
              <Component disabled={status === 'released'} data-test={action.name} key={idx} {...action.data}>
                {action.name}
              </Component>
            );
          })}
        </DesktopKebab>
      </WithPermissions>
    )
  };
};

export const numbersToItemList = numbers => numbers.map(numberToItemList);

export const processFilters = (source, filters) => {
  return source
    .filter(number => {
      const allFilterValues = Object.entries(filters).map(
        ([filterKey, filtersList]) =>
          Object.entries(filtersList).map(
            ([id, { attr, value }]) => getIn(attr, number) === value)
      );
      return all(allFilterValues.map(filterValues => any(filterValues) || filterValues.length === 0));
    });
};

export const mergeNumberAndMarket = (number, markets) => {
  return number
    .map(number => ({
      ...number,
      market: markets.find(market => market.id === number.market)
    }));
}
