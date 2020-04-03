import React from 'react';
import styled from 'styled-components';
import { Label } from 'reactstrap';

const PreviewText = styled.p`
  background: var(--ghostBlue);
  padding: var(--pad3) 0;
  line-height: 1.5 !important;
  position: relative;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(-1 * var(--pad3));
    background: var(--ghostBlue);
    width: 100vw;
    height: 100%;
    z-index: -99;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CharCount = styled.span`
  color: var(--darkGray);
`;

const Wrapper = styled.div`
  padding-top: var(--pad4);
`;

function ReviewSend(props) {
  const { message } = props;
  return (
    <Wrapper>
      <Header>
        <Label for='previewText'>Preview</Label>
        <CharCount className='textM'>{(message && message.length) || 0}/160 Characters</CharCount>
      </Header>
      <PreviewText data-test='sms-template-preview' className='textL mt-1'>
        {message}
      </PreviewText>
    </Wrapper>
  );
}

export default ReviewSend;
