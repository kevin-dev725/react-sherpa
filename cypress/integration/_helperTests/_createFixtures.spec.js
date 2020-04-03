describe('Create fixture files from API response', () => {
  let prospectId = Cypress.env('testProspect');
  let campaignId = Cypress.env('testCampaign');
  let marketId = Cypress.env('testMarket');

  before(() => {
    // cy.login();
  });

  it('creates auth token JSON file', () => {
    cy.createTokensJson();
    cy.fixture('tokens').should('exist');
  });

  it('creates the login failure JSON file', () => {
    cy.createFixture('loginFailure.json', 'auth/jwt/create', 'POST', {
      body: { username: 'test', password: 'test' },
      failOnStatusCode: false
    });
    cy.fixture('loginFailure').should('exist');
  });

  it('creates the user info JSON file', () => {
    cy.createFixture('userInfo.json', 'auth/users/me');
    cy.fixture('userInfo').should('exist');
  });

  it('creates the markets JSON file', () => {
    cy.createFixture('markets.json', 'markets');
    cy.fixture('markets').should('exist');
  });

  it('creates the campaigns JSON file', () => {
    cy.createFixture('campaigns.json', 'campaigns');
    cy.fixture('campaigns').should('exist');
  });

  it(`creates a market ${marketId} campaigns JSON file`, () => {
    cy.createFixture(`market${marketId}campaigns.json`, `campaigns`, 'GET', {
      qs: { market: marketId, is_archived: false }
    });
    cy.fixture(`market${marketId}campaigns.json`).should('exist');
  });

  it(`creates a campaign ${campaignId} response JSON file`, () => {
    cy.createFixture(`campaign${campaignId}.json`, `campaigns/${campaignId}`);
    cy.fixture(`campaign${campaignId}`).should('exist');
  });

  it(`creates a campaign ${campaignId} prospects response JSON file`, () => {
    cy.createFixture(`campaign${campaignId}Prospects.json`, `campaign-prospects`, 'GET', {
      qs: { page_size: 20, campaign: campaignId, is_priority_unread: true }
    });
    cy.fixture(`campaign${campaignId}Prospects`).should('exist');
  });

  it('creates the lead stages JSON file', () => {
    cy.createFixture('leadStages.json', 'leadstages');
    cy.fixture('leadStages').should('exist');
  });

  it('creates the support page response JSON file', () => {
    cy.createFixture('support.json', 'support-links');
    cy.fixture('support').should('exist');
  });

  it('creates a prospect list response JSON file', () => {
    cy.createFixture('prospects.json', 'prospects');
    cy.fixture('prospects').should('exist');
  });

  it(`creates a prospect ${prospectId} response JSON file`, () => {
    cy.createFixture(`prospect${prospectId}.json`, `prospects/${prospectId}`);
    cy.fixture(`prospect${prospectId}`).should('exist');
  });

  it(`creates a prospect ${prospectId} notes response JSON file`, () => {
    const params = { prospect: prospectId, page: 1, page_size: 10 };
    cy.createFixture(`prospect${prospectId}Notes.json`, 'prospect-notes', 'GET', params);
    cy.fixture(`prospect${prospectId}Notes`).should('exist');
  });

  // it('creates the sms-relay-maps route fixture', () => {
  //   cy.createFixture('smsRelayMaps.json', 'sms-relay-maps', 'POST', {
  //     body: { prospect: prospectId, rep: 1 }
  //   });
  //   cy.fixture('smsRelayMaps').should('exist');
  // });

  it('creates an empty response JSON file', () => {
    cy.writeFile(`cypress/fixtures/empty.json`, { results: [] });
    cy.fixture('empty').should('exist');
  });
});
