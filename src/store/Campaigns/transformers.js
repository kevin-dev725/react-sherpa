import React from 'react';

// pipeline to automatically create the appropriate interface from a
// campaign|prospect|campaignFolder to data that the ItemList component can render
export const create_pipeline = steps => data => {
  let newData = { ...data };

  // run through the pipeline
  steps.forEach(([key, Component]) => {
    let dependency = data[key];

    // do step is value is not null
    if (dependency !== null) {
      newData[key] = <Component data={dependency} />;
    }
  });

  return newData;
};

// interface that all data must adhere to if they want to be rendered
// by the ItemList component
const IListItem = {
  name: null,
  subInfo: null,
  mainInfo: null,
  icon: null,
  link: null,
  indicator: null,
  isRead: false,
  readable: false
};

// Function that turns a campaign data to something the ItemList
// component utilize to render.
export const campaignToItemList = props => {
  const { id, market, name, priority, totalLeads, hasUnreadSMS } = props;
  return {
    ...IListItem,
    name,
    subInfo: {
      priority,
      totalLeads
    },
    readable: true,
    isRead: !hasUnreadSMS,
    link: `/markets/${market}/campaigns/${id}/`
  };
};

// function that runs the transformations
export const campaignsToItemList = (campaigns, pipeline) =>
  campaigns.map(campaignToItemList).map(pipeline);

// Temporary function that creates the ALL folder that's going to be
// removed once the folder-endpoint works properly
export const createAllFolder = data => {
  return {
    id: 1,
    name: 'ALL',
    company: 0,
    isActive: true,
    hasUnreadSMS: data.filter(campaign => campaign.hasUnreadSMS).length > 0,
    totalCampaigns: data.length
  };
};
