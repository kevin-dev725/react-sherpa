import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--pad2);
  height: 2.5em;

  svg {
    margin-right: var(--pad1);
  }
`;

function SectionHeader(props) {
  return (
    <Wrapper>
      <h3 className="m-0">{props.title}</h3>
      {props.btns && props.btns}
    </Wrapper>
  );
}

export default SectionHeader;
