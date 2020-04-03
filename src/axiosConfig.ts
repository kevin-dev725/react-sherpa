import axios from 'axios';
import ReduxStore from './store/store';
import { loadTokens, getNewAccessToken } from './store/Auth/utils';
import { addNewToast } from './store/Toasts/actions';
import { generalNetworkError } from './helpers/variables';
import { logout } from './store/Auth/actions';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({ baseURL });

// adds interceptor for 401's
const okResponseInterceptor = (response: any) => response;

const errorResponseInterceptor = (error: any) => {
  const { status } = error.response;
  const {
    auth: { refreshToken }
  } = loadTokens();
  if (error.response.data.code === "token_not_valid") {
    // if we get an invalid-refresh token then logout
    ReduxStore.dispatch(logout());
    return Promise.reject(error);
  }

  // updates access token if is an error 401 AND refresh token is valid
  if (status === 401 && refreshToken) {
    return getNewAccessToken(refreshToken, error);
  }
  // display error toast/alert
  if (status > 404) {
    // NOTE: Add logs errors from the server via sentry/trackjs or any other services
    ReduxStore.dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  }

  return Promise.reject(error);
};

// handle case where we get =401= unauthorized
axiosInstance.interceptors.response.use(okResponseInterceptor, errorResponseInterceptor);

export const delayedRequest = (expr: any, timeout: number) => {
  return expr.then((response: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout, response));
  });
};

export default axiosInstance;
