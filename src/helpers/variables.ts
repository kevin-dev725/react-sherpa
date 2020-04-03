
// responsiveness
export const maxMobileWidth = 768;

// data fetch status
export const Initial = 'Initial';
export const Fetching = 'Fetching';
export const Success = 'Success';
export const FetchError = 'FetchError';
export const Updating = 'Updating';

// debounce time
export const debounceTime = 30;

// min spinner times
export const fastSpinner = 250;

// toast stuff
export const toastLingerTime = 5000;

// note messages
export const messageNewNote = 'New note added';
export const messageUpdateNote = 'Note updated';
export const messageDeleteNote = 'Note Deleted';

export const generalNetworkError = 'Something went wrong.  Please refresh or try again later.';

// reducer stuff
export const prospectDetailsReducer = 'prospectDetailsReducer';

// sms stuff
export const pollingInterval = 20000;
export const messagesPlaceholderText = 'Send a message to start a conversation with this prospect';
export const quickRepliesPlaceholderText = 'No Quick Replies';

export const campaignHeaderInfo = {
  fromText: 'Campaign List',
  hasBackButton: true,
  tabs: [
    {
      idx: '1',
      name: 'Send',
      icon: 'paper-plane'
    },
    {
      idx: '2',
      name: 'Messages',
      icon: 'comment-dots'
    },
    {
      idx: '3',
      name: 'Notes',
      icon: 'sticky-note'
    }
  ],
  actions: {
    main: [
      {
        btnType: 'primary',
        text: 'Add Prospects',
        // this is for adding the onclick later
        action: 'addProspects'
      }
    ],
    secondary: [
      {
        icon: 'pencil-alt',
        // this is for adding the onclick later
        action: 'editCampaign'
      },
      {
        icon: 'trash',
        // this is for adding the onclick later
        action: 'archiveCampaign'
      }
    ]
  }
};

export const prospectHeaderInfo = {
  fromText: 'Prospect List',
  hasBackButton: true,
  tabs: [
    {
      idx: '1',
      name: 'Details',
      icon: 'user'
    },
    {
      idx: '2',
      name: 'Messages',
      icon: 'comment-dots'
    },
    {
      idx: '3',
      name: 'Notes',
      icon: 'sticky-note'
    }
  ]
};

export const ProspectActions = [
  {
    icon: 'verified',
    name: 'Verified',
    status: false,
    attr: 'ownerVerifiedStatus',
    link: null,
    background: 'green'
  },
  {
    icon: 'dnc',
    name: 'DNC',
    status: false,
    attr: 'doNotCall',
    link: null,
    background: 'red'
  },
  {
    icon: 'priority',
    name: 'Priority',
    status: false,
    attr: 'isPriority',
    link: null,
    background: 'orange'
  },
  {
    icon: 'qualified',
    name: 'Qualified',
    status: false,
    attr: 'isQualifiedLead',
    link: null,
    background: 'purple'
  }
];

export const desktopCampaignHeaderInfo = {
  hasBackButton: false,
  tabs: [
    {
      idx: '1',
      name: 'Campaigns List',
      icon: 'list-ul'
    },
    {
      idx: '2',
      name: 'All Unread',
      icon: 'comment-dots'
    },
  ],
  actions: {
    main: [
      {
        btnType: 'primary',
        text: 'New Campaign',
        // this is for adding the onclick later
        action: 'addProspects',
        'data-test': 'desktop-new-campaign-button'
      }
    ]
  }
};

export const desktopCampaignDetailHeaderInfo = {
  hasBackButton: true,
  tabs: [
    {
      idx: '1',
      name: 'Metrics',
      icon: 'chart-bar'
    },
    {
      idx: '2',
      name: 'Send',
      icon: 'paper-plane'
    },
    {
      idx: '3',
      name: 'Prospects & Messages',
      icon: 'comment-dots'
    },
    {
      idx: '4',
      name: 'Notes',
      icon: 'sticky-note'
    }
  ],
  actions: {
    main: [
      {
        btnType: 'secondary',
        text: 'Create Follow-Up',
        // this is for adding the onclick later
        action: 'createFollowUp',
        'data-test': 'open-followup-modal'
      },
      {
        btnType: 'primary',
        text: 'New Campaign',
        // this is for adding the onclick later
        action: 'addProspects'
      }
    ],
    secondary: [
      {
        icon: 'pencil-alt',
        // this is for adding the onclick later
        action: 'editCampaign'
      },
      {
        icon: 'trash',
        // this is for adding the onclick later
        action: 'archiveCampaign'
      }
    ]
  }
};
// new messages
export const MESSAGES_POLLING_INTERVAL = 30000;

// no desktop messages
export const underConstructionMessage = "We are currently working on a full desktop version of the new Sherpa. Until then, you will need to be on a mobile device to use this version of Sherpa."

export const noSubscriptionMessage = "You do not have an active subscription, please use the desktop version for subscription activation."


export const showDesktopStateEnvs = process.env.REACT_APP_SHOW_DESKTOP === undefined || process.env.REACT_APP_SHOW_DESKTOP === "true";

// virtualize list
export const vListHeight = 600;
export const vListItems = 150;

// campaign sorting
export const campaignSortingOptions = [
  {
    name: 'Newest',
    value: { value: '-created_date', id: 0 }
  },
  {
    name: 'Oldest',
    value: { value: 'created_date', id: 1 }
  },
  {
    name: 'Alpha (A-Z)',
    value: { value: 'name', id: 2 }
  },
  {
    name: 'Alpha (Z-A)',
    value: { value: '-name', id: 3 }
  },
];

// followup campaigns
export const createFollowupMessage = 'By creating a Follow-up Campaign all the prospects that have not responded to the SMS from this campaign will permanently moved over to the new Campaign.';

export const timezones = ['US/Mountain', 'US/Arizona', 'US/Central', 'US/Pacific', 'US/Eastern', 'US/Hawaii', 'US/Alaska'];
