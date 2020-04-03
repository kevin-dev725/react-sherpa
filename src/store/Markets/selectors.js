export const marketsList = (state) => state.markets.folders;
export const marketsCount = (state) => state.markets.count;
export const marketsStatus = (state) => state.markets.status;
export const marketsError = (state) => state.markets.error;
export const marketsWithCampaigns =
  (state) =>
    marketsList(state)
      .filter(market => market.campaignCount > 0)
export const activeMarkets =
  (state) =>
    marketsList(state)
      .filter(market => market.isActive)
      .sort((market1, market2) => market1.name.localeCompare(market2.name));
