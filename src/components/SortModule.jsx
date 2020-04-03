import React from 'react';
import InputSelect2 from '../components/InputSelect2';
import { DropdownItem } from 'reactstrap';


function SortModule(props) {
  const { sortOptions, sortChange, defaultValue = -1 } = props;

  const onSortChange = e => {
    let sortBy = sortOptions[e.target.value].value;
    sortChange(sortBy);
  };

  const sortBy = sortOptions.map((item, key) => (
    <DropdownItem onClick={onSortChange} key={key} value={key}>
      {item.name}
    </DropdownItem>
  ));

  return (
    <InputSelect2
      id='sortOrder'
      value={sortOptions[defaultValue].name}
      placeholder="Sort By"
      options={sortBy}
    />
  );
}

export default SortModule;
