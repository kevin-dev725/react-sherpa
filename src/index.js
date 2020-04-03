import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/styles/css/main.css';
import { Provider } from 'react-redux';
import ReduxStore from './store/store';
import { setAuthTokenHeader } from './store/Auth/utils';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import * as Sentry from '@sentry/browser';

console.log('NODE_ENV = ' + process.env.NODE_ENV);

if (process.env.REACT_APP_REPORT_ERRORS === 'true') {
  console.log('logging errors to sentry');
  Sentry.init({ dsn: 'https://cdd0b4541cf9438db73498151a71a4c2@sentry.io/1917554' });
}

setAuthTokenHeader();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={ReduxStore}>
	<App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = ReduxStore;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
