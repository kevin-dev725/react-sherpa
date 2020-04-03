import React, { Component } from 'react';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';

const Boundary = styled.div`
  text-align: left;
  line-height: 1.5;
  width: 550px;
  max-width: 40vw;
  margin-bottom: 15vh;
  border-left: 5px solid var(--info);
  padding-left: 1.5rem;

  h2 {
    font-weight: 400;
  }

  h3 {
    color: var(--info);
    font-weight: 400;
  }

  @media (max-width: 767px) {
    max-width: 75vw;
    margin-bottom: 0;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  width: 100vw;
  background: var(--white);
  color: var(--darkNavy);
`;

const initialState = {
  eventId: null,
  hasError: false
};

class ErrorBoundary extends Component {
  state = { ...initialState }

  componentDidUpdate(props, prevState) {
    if (this.state === prevState) {
      this.setState(initialState);
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <Boundary data-test='error-boundary'>
          <h2 className="m-0">Oops! It looks like an error has occurred. We have been made aware of the error and are looking into it.</h2>
          <h3 className="mt-3 mt-md-1 mb-0">- Sherpa Team</h3>
          </Boundary>
        </ErrorWrapper>
      );
    }
    return this.props.children;
  }
};

export default ErrorBoundary;
