import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { history } from './history';

// pages
import Navbar from './components/Navbar.jsx';
import NavbarDesktop from './components/NavbarDesktop.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import CampaignsPage from './containers/CampaignsPage/CampaignsPage';
import CampaignFoldersPage from './containers/CampaignFoldersPage/CampaignFoldersPage';
import CampaignDetailsPage from './containers/CampaignDetailsPage/CampaignDetailsPage';
import ProspectDetailsPage from './containers/ProspectDetailsPage/ProspectDetailsPage';
import SupportPage from './containers/SupportPage/SupportPage';
import DesktopCampaignsPage from './containers/DesktopCampaignsPage/DesktopCampaignsPage';
import AccountSettingsPage from './containers/AccountSettingsPage/AccountSettingsPage';
import DesktopCampaignDetailPage from './containers/DesktopCampaignDetailPage/DesktopCampaignDetailPage';
import NewMessagesPage from './containers/NewMessages/NewMessages.jsx';
import PhoneNumberManagerPage from './containers/PhoneNumberManager/PhoneNumberManagerPage';

// store
import { campaignProspectUnread } from './store/campaignProspectStore/api';
import { fetchCampaignProspectsUnread } from './store/campaignProspectStore/actions';
import { isAuthenticated, getUserData } from './store/Auth/selectors';


// components
import { ProtectedRoute } from './components/ProtectedRoute';
import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import ToastContainer from './components/Toasts/ToastContainer';
import NoApp from './components/NoApp';
import { DataLoader } from './components/LoadingData';

//font awesome
import './assets/fontAwesome/index.ts';
import './App.css';
import * as vars from './helpers/variables';
import { debounce } from './helpers/utils';
import { fetchUserInfo } from './store/Auth/actions';
import { arrayToMapIndex, groupBy } from './store/utils';
import { trimProspectsAndMessages } from './store/campaignProspectStore/transformers';
import { updateProspectList } from './store/prospectStore/actions';
import { populateProspectMessages } from './store/ProspectDetails/messages/actions';

function App() {
  // selectors
  const is_auth = useSelector(isAuthenticated);
  const userData = useSelector(getUserData);

  // local state
  const [isMobile, setIsMobile] = useState(window.innerWidth < vars.maxMobileWidth);

  const showDesktop = vars.showDesktopStateEnvs;

  const dispatch = useDispatch();

  const updateViewport = () => {
    const viewWidth = window.innerWidth;
    setIsMobile(viewWidth < vars.maxMobileWidth);
  };

  useEffect(() => {
    // debounce used to slow down resize to avoid making the display laggy when resizing
    const debounced = debounce(updateViewport, vars.debounceTime);
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, []);

  const fetchMessages = () => {
    campaignProspectUnread()
      .then(({ data }) => {
        const [prospects, prospectCampaigns, messages] = trimProspectsAndMessages(data);
        dispatch(fetchCampaignProspectsUnread({
          data: groupBy((campaignProspect: any) =>
            campaignProspect.campaign.id, prospectCampaigns),
          count: data.length
        }));
        dispatch(updateProspectList({
          results: arrayToMapIndex('id', prospects),
          next: null,
          previous: null,
          overridePages: false
        }));
        dispatch(populateProspectMessages(messages));
      })
      .catch(error => { console.log(error.response) });
  };

  useEffect(() => {
    if (is_auth) {
      // fetch messages
      fetchMessages();
      const interval = setInterval(fetchMessages, vars.MESSAGES_POLLING_INTERVAL);

      // fetch auth-data on reload
      fetchUserInfo(dispatch);

      return () => clearInterval(interval);
    }
  }, [is_auth]);

  const determineNav = () => {
    const login = <Route exacts path='/login' component={LoginPage} />;
    const desktopNav = <NavbarDesktop page={history} />;
    const mobileNav = <Navbar page={history} />;
    return !is_auth ? login : isMobile ? mobileNav : desktopNav;
  };

  const determineMessage = () => {
    return userData.company.subscriptionStatus !== 'active' ? vars.noSubscriptionMessage : vars.underConstructionMessage;
  };

  const showRoutes = (isMobile: boolean, showDesktop: boolean) => {
    if (userData.company && is_auth) {
      const subscriptionStatus = userData.company.subscriptionStatus;
      if (subscriptionStatus !== 'active' && isMobile) return false;
      if (!showDesktop && !isMobile) return false;
    }

    return true;
  };

  const determineLoadingStatus = () => {
    return !userData.company.subscriptionStatus && is_auth ? vars.Fetching : vars.Success;
  };
  return <DataLoader
    emptyResultsMessage="User could not be authorized"
    status={determineLoadingStatus()}
    appWrapper={true}
    data={[userData]}
    dataTest={isMobile ? 'mobile-view' : 'desktop-view'}
    renderData={() => {
      return (showRoutes(isMobile, showDesktop) ? (
        <Router history={history}>
          {determineNav()}
          <Switch>
            <ProtectedRoute is_auth={is_auth} path='/' component={CampaignFoldersPage} exact />
            <ProtectedRoute
              is_auth={is_auth}
              path='/markets/:marketId/campaigns'
              component={CampaignsPage}
              exact
            />
            <ProtectedRoute
              is_auth={is_auth}
              path='/markets/:marketId/campaigns/:campaignId/details'
              component={CampaignDetailsPage}
              exact
            />
            <ProtectedRoute is_auth={is_auth} path='/campaigns' component={DesktopCampaignsPage} exact />
            <ProtectedRoute is_auth={is_auth} path='/account-settings' component={AccountSettingsPage} exact />
            <ProtectedRoute is_auth={is_auth} path='/campaign/:id/details' component={DesktopCampaignDetailPage} exact />
            <ProtectedRoute
              is_auth={is_auth}
              path='/prospect/:prospectId/details'
              component={ProspectDetailsPage}
              exact
            />
            <ProtectedRoute is_auth={is_auth} path='/new-messages' component={NewMessagesPage} exact />
            <ProtectedRoute is_auth={is_auth} path='/prospects' component={ProspectsSearch} />
            <ProtectedRoute is_auth={is_auth} path='/support' component={SupportPage} />
            <ProtectedRoute is_auth={is_auth} path='/phone-manager' component={PhoneNumberManagerPage} />
            <Route >
              <p>No Page Found</p>
            </Route>
          </Switch>
          {is_auth && <ToastContainer />}
        </Router>
      ) : <NoApp message={determineMessage()} />);
    }}
  />;
}

export default App;
