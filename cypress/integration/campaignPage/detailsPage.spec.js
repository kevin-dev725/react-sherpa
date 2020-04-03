describe('campaign details page', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testCampaign'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`;

  before(() => {
    cy.login();
  });

  it('opens the correct page', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `campaigns/${campaignId}`,
      response: `campaign${campaignId}`
    });
    cy.visit(`${url}/${campaignUrl}`);
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/${campaignUrl}`);
    });
  });

  it('displays the correct tabs', () => {
    cy.get('[data-test=Send]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Messages]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Notes]')
      .should('exist')
      .and('be.visible');
  });

  it('takes the user back to the campaigns page when clicking the "Campaign List" button', () => {
    cy.login();
    cy.server();
    cy.stubResponse({ method: 'GET', url: 'campaigns', response: `campaign${campaignId}` });
    cy.visit(`${url}/${campaignUrl}`);
    cy.get(`[data-test=tabbed-header]`)
      .find('button')
      .click();
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/`);
    });
  });
});
