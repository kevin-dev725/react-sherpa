import React from 'react';
import styled from 'styled-components';
import logo from "../assets/images/sherpaLogo.png";

const Message = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--sherpaBlueGradient);
  color: var(--white);
  z-index: 999999;

  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;

  padding: 2em;
  font-size: calc(22px + .6vw);
  line-height: 1.4;

  .content {
    max-width: 840px;
    position: relative;
  }

  .text {
    font-size: 1.1em;
    font-weight: 700;
  }

  em {
    align-self: flex-start;
    margin-top: 1em;
    font-weight: 400;
    font-size: 1.1em;
    display: inline-block;
    margin-bottom: 4em;
  }

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 148px;
    padding-bottom: 50px;
  }

  h1 {
    font-size: 1.6em;
    margin-bottom: 1.1em;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 900;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

function NoApp(props) {
  return (
    <Message {...props}>
      <div className="content" data-test="no-app">
        <h1>Sorry...</h1>
        <div className="text">
          {props.message}
        </div>
        <em>-The Sherpa Team</em>
      </div>
      <img src={logo} alt="sherpa" />
    </Message>
  );
}

export default NoApp;
