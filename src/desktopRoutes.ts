import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
import SupportPage from './containers/SupportPage/SupportPage.jsx';
import DesktopCampaigns from './containers/DesktopCampaignsPage/DesktopCampaignsPage';
import AccountSettingsPage from './containers/AccountSettingsPage/AccountSettingsPage';
import DesktopCampaignDetails from './containers/DesktopCampaignDetailPage/DesktopCampaignDetailPage';
import { ACCOUNT_SETTINGS_VIEW_PAGE } from './permissions/accountSettings.js';
import PhoneNumberManagerPage from './containers/PhoneNumberManager/PhoneNumberManagerPage.jsx';

const Routes = [
  {
    path: '/unreadMessages',
    name: 'New Messages',
    navIcon: 'comment-dots',
    alt: 'Unread Messages',
    exact: true,
    component: SupportPage,
    mobile: false
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    navIcon: 'bullhorn',
    alt: '',
    exact: true,
    component: DesktopCampaigns,
    mobile: true
  },
  {
    path: '/phone-manager',
    name: 'Number Manager',
    navIcon: 'clipboard-list',
    alt: '',
    exact: true,
    component: PhoneNumberManagerPage,
    mobile: true,
    permissionProps: { checkSubscription: true, redirect: true },
    checkPermissions: true,
  },
  {
    path: '/support',
    name: 'Support',
    navIcon: 'question-circle',
    alt: 'support',
    exact: true,
    component: SupportPage,
    mobile: false
  },
  {
    path: '/account-settings',
    name: 'Account Settings',
    navIcon: 'user-cog',
    alt: 'account settings',
    exact: true,
    component: AccountSettingsPage,
    mobile: false,
    checkPermissions: true,
    permissionProps: {
      checkRole: true,
      permission: ACCOUNT_SETTINGS_VIEW_PAGE
    },
  }
];

export default Routes;
