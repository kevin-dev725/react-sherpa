import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import SettingsSection from './SettingsSection';

// utils
/*
  The comparators defines way to define sorting function based on
  data type.

  0 -- denotes descending
  1 -- denotes ascending

  If there are different types that need support you can add them
  here and define a fucntion for both descending(0) and ascending(1)
*/
export const comparators = {
  string: {
    0: (value1, value2) => value2.localeCompare(value1),
    1: (value1, value2) => value1.localeCompare(value2)
  },
  number: {
    0: (value1, value2) => value2 - value1,
    1: (value1, value2) => value1 - value2
  },
  boolean: {
    0: (value1, value2) => value1 - value2,
    1: (value1, value2) => value2 - value1
  }
}

const downIcon = (active) =>
  <FontAwesomeIcon
    icon="chevron-down"
    size="xs"
    className="mr-1"
    color={active ? 'blue' : 'black'}
  />;
const upIcon = (active) =>
  <FontAwesomeIcon
    icon="chevron-up"
    size="xs"
    className="mr-1"
    color={active ? 'blue' : 'black'}
  />;

const renderHeader = ({ sorting, name, active }, onChange, idx) => {
  return (
    <span key={name} style={{ cursor: 'pointer' }} onClick={() => onChange(idx)}>
      {!sorting ?
        downIcon(active) : upIcon(active)}
      {name}
    </span>
  );
};

const renderHeaders = (headers, onChange) => {
  return (
    <>
      {headers.map((header, idx) => {
        return (
          header ? renderHeader(header, onChange, idx) : <span key={idx}></span>
        );
      })}
    </>
  );
};

// helper function that sets all headers to in-active, arrow pointing down.
const setToInactive = (header) => {
  if (header) {
    return { ...header, active: false, sorting: 0 };
  }
};

const TableWithSorting = (props) => {
  const [sortingHeaders, setSortingHeaders] = useState(props.headers);

  const onChange = (id) => {
    const currentHeader = { ...sortingHeaders[id] };
    const newHeaders = sortingHeaders.map(setToInactive);

    //  set the new sorting for the column-sort that was clicked
    currentHeader.sorting = currentHeader.sorting ? 0 : 1;
    currentHeader.active = true;
    newHeaders[id] = currentHeader; // replace old header with new one

    // triggers the =sort-function= to run on the component that is using this.
    props.setActiveSort({ id, sorting: currentHeader.sorting });

    // set the new headers
    setSortingHeaders(newHeaders);
  };

  const ListStyleComponent = props.listStyle;
  return (
    <SettingsSection
      type="table"
      header={props.header}
    >
      <ListStyleComponent >
        <li className="item header textM mb-1">
          {renderHeaders(sortingHeaders, onChange)}
        </li>
        {props.children}
      </ListStyleComponent>
    </SettingsSection>
  );
}

export default TableWithSorting;
