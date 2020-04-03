import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
 cursor: pointer;
`;

function MessageSelect(props) {
    return (
        <MessageWrapper className='stretched-link' onClick={props.onClick} />
    )
}

export default MessageSelect;
