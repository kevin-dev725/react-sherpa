import {
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB,
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT,
  SET_CAMPAIGN_DESKTOP_TAB_DATA,
  RESET_CAMPAIGN_LIST_FILTER_TABS,
  SET_ACTIVE_CAMPAIGN_PROSPECT
} from './actionTypes';
import { ARCHIVE_CAMPAIGN, UNARCHIVE_CAMPAIGN } from '../../../../Campaigns/actionTypes';

const initialState = {
  activeSort: '-created_date',
  activeTab: 'active',
  activeProspect: 0,
  tabs: {
    'all': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'active': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'followup': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'ownedbyme': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    },
    'archived': {
      count: 0,
      sortOrder: [],
      sortedBy: null,
      nextPage: null
    }
  }
};

export const path = [
  'uiStore',
  'campaignsPageDesktopView',
  'campaignsList',
  'filterData'
];

export default function reducer(state: any = initialState, action: any) {
  switch (action.type) {
    case RESET_CAMPAIGN_LIST_FILTER_TABS:
          return {
              ...state,
              tabs: initialState.tabs
          };
    case SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT:
      return {
        ...state,
        activeSort: action.payload,
      };
    case SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case SET_CAMPAIGN_DESKTOP_TAB_DATA: {
      let newSortOrder = [];

      // we're just adding on to the set order as sorting is the same
      if (state.tabs[action.payload.tab].sortedBy === state.activeSort) {
        newSortOrder = [
          ...state.tabs[action.payload.tab].sortOrder,
          ...action.payload.data.sortOrder
        ]
      } else {
        newSortOrder = action.payload.data.sortOrder
      }

      return {
        ...state,
        tabs: {
          ...state.tabs,
          [action.payload.tab]: {
            sortOrder: newSortOrder,
            nextPage: action.payload.data.nextPage,
            sortedBy: action.payload.data.sortedBy,
            count: action.payload.data.count
          }
        }
      }
    }
    case ARCHIVE_CAMPAIGN: {
      // remove the archived campaign from each tab except archived tab
      if (action.payload.isArchived) {
        const tabsToRemoveFrom = ['active', 'ownedbyme', 'followup'];
        const newTabs = tabsToRemoveFrom.reduce((acc: any, key: string) => {
          const tab = { ...state.tabs[key] };
          tab.sortOrder = tab.sortOrder.filter((id: number) => id !== action.payload.id)
          acc[key] = tab;

          return acc
        }, {});

        // update archived list
        const newArchivedTab = { ...state.tabs.archived };
        newArchivedTab.sortOrder.push(action.payload.id)

        return {
          ...state,
          tabs: {
            ...state.tabs,
            ...newTabs,
            archived: { ...newArchivedTab }
          }
        };
      }
    }
    case UNARCHIVE_CAMPAIGN: {
      const newArchivedState = { ...state.tabs.archived };
      newArchivedState.sortOrder = newArchivedState.sortOrder.filter(
        (id: any) => id !== action.payload
      );

      return {
        ...state,
        tabs: {
          ...state.tabs,
          archived: newArchivedState
        }
      };
    }
    case SET_ACTIVE_CAMPAIGN_PROSPECT: {
        return {
            ...state,
            activeProspect: action.payload
        }
    }
    default:
      return state;
  }
}
