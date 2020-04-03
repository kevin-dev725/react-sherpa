describe('virtualized list', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testMarket');

  before(() => {
    cy.login();
  });

  it('renders the virtualized list', () => {
    cy.visit(`${url}/markets/${marketId}/campaigns`);
    cy.get('#campaignVirtualizedList').should('exist');
  });
});
