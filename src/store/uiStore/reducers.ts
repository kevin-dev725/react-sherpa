import { combineReducers } from 'redux';
import prospectSearchView from './prospectSearchView/reducer';
import prospectDetailsView from './prospectDetailsView/reducer';
import campaignMessagesView from './campaignMessagesTabView/reducer';
import prospectDetailsPageView from './prospectDetailsPageView/reducer';
import campaignDetailsPageView from './campaignDetailsPageView/reducer';
import campaignsPageView from './campaignsPageView/reducer';
import campaignsPageDesktopView from './campaignsPageDesktopView/reducers';

const reducers = combineReducers({
  prospectSearchView,
  prospectDetailsView,
  campaignMessagesView,
  prospectDetailsPageView,
  campaignDetailsPageView,
  campaignsPageView,
  campaignsPageDesktopView
});

export default reducers;
