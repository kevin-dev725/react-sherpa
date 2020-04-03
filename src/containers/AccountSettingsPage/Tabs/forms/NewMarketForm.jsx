import React, { useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import {  Label, Input, FormGroup,  Button } from 'reactstrap';
import InputGroupBorder from '../../../../components/InputGroupBorder';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const SlideIn = styled(CSSTransition)`
  --timing: .2s ease-in-out;
  --left: 0%;
  position: relative;
  overflow: hidden;
  transition: left var(--timing);
  left: var(--left);
  flex: 0 0 100%;

  &.slide {
    &-enter {
      left: 110%;
      &-active {
        left: 110%;
      }
      &-done {
        left: var(--left);
      }
    }
    &-exit {
      left: var(--left);
      &-active {
        left: -110%;
      }
    }
  }
`;

function NewMarketForm() {
  const [showPhase1, setShowPhase1] = useState(true);

    return (
        <Wrapper>
            <SlideIn
                in={showPhase1}
                timeout={300}
                appear={true}
                classNames="slide"
                unmountOnExit={true}>
                <div className="phase1">
                <FormGroup>
                    <Label htmlFor="state">State</Label>
                    <InputGroupBorder>
                    <Input name="state" placeholder="Enter State" />
                    </InputGroupBorder>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="market">Market</Label>
                    <InputGroupBorder>
                    <Input name="market" placeholder="Enter Market" />
                    </InputGroupBorder>
                </FormGroup>
                <Button className="mt-3" color="primary" size="lg" block onClick={() => setShowPhase1(!setShowPhase1)}>
                    Next
                </Button>
                </div>
            </SlideIn>

            <SlideIn
                in={!showPhase1}
                timeout={300}
                appear={false}
                classNames="slide"
                unmountOnExit={true}>
                <div className="phase2">
                <FormGroup>
                    <Label htmlFor="marketName">Market Name</Label>
                    <InputGroupBorder>
                    <Input name="marketName" placeholder="Enter Market Name" />
                    </InputGroupBorder>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="number">Call Forwarding Number</Label>
                    <InputGroupBorder>
                    <Input name="number" placeholder="Enter Call Forwarding Number" />
                    </InputGroupBorder>
                </FormGroup>
                <Button className="mt-3" color="primary" size="lg" block onClick={() => { }}>
                    Create Market
                </Button>
                </div>
            </SlideIn>
        </Wrapper>
    );
}

export default NewMarketForm;
