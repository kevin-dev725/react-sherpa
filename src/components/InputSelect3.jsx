import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const themeStyles = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    dangerLight: "black",
    danger: "white",
    primary: "var(--gray)",
    primary75: "var(--gray)",
    primary50: "var()"
  }

});

const selectStyles = {
  option: (provided) => ({
    ...provided,
  }),
  className: () => 'dropdown-option',
  control: (provided, state) => ({
    ...provided,
    border: "0",
    borderBottom: state.selectProps.error ? "2px solid var(--red)" : "2px solid var(--mediumGray)",
    borderRadius: "0",
    boxShadow: "none !important",
    cursor: "pointer"

  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    stroke: "var(--sherpaBlue)",
    fill: "var(--sherpaBlue)"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "1rem 0",
    fontSize: "1.125rem",
    height: "calc(1.5em + 2rem)"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#B5B5B5"
  }),
  svg: (provided) => ({
    ...provided,
    color: "var(--sherpaBlue)",
    fill: "var(--sherpaBlue)"
  }),
  singleValue: (provided) => ({
    ...provided
  }),
}

function InputSelect3(props) {

  const CustomDropdownIndicator = ({ innerProps, innerRef }) => (
    <FontAwesomeIcon icon="chevron-down" color="var(--sherpaBlue)" ref={innerRef} {...innerProps} />
  );

  return (
    <Select
      classNamePrefix="react-select"
      menuPlacement="auto"
      theme={themeStyles}
      styles={selectStyles}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator: CustomDropdownIndicator
      }}
      {...props}
    />
  );
}

export default InputSelect3;
