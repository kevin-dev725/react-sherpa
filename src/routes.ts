import ProspectsSearch from './containers/ProspectsSearch/ProspectsSearch.jsx';
import CampaignsFolders from './containers/CampaignFoldersPage/CampaignFoldersPage';
import SupportPage from './containers/SupportPage/SupportPage.jsx';

const Routes = [
  {
    path: '/',
    name: 'Campaigns',
    navIcon: 'bullhorn',
    alt: '',
    exact: true,
    component: CampaignsFolders,
    mobile: true
  },
  {
    path: '/prospects',
    name: 'Prospects',
    navIcon: 'search',
    alt: 'prospects',
    exact: true,
    component: ProspectsSearch,
    mobile: false
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
    path: '/new-messages',
    name: 'New Messages',
    navIcon: 'comment-dots',
    alt: 'Unread Messages',
    exact: true,
    component: SupportPage,
    mobile: false
  }
];

export default Routes;
