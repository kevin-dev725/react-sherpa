describe('Metris Tab', () => {
  const clientUrl = Cypress.env('clientUrl');
  const campaignWithBatchStats = 1;
  const campaignWithoutBatchStats = 2;

  beforeEach(() => {
    cy.viewport(950, 800);
    cy.login();
  });

  it('Batch stats sorted by descending order', () => {
    cy.visit(`${clientUrl}/campaign/${campaignWithBatchStats}/details`);
    cy.wait(500);
    cy
      .get('[data-test=Metrics]')
      .click();
    cy
      .get('[data-test=displayed-data]')
      .children()
      .should($children => {
        expect($children.length).to.be.greaterThan(0);
      });
  });

  it('Campaign batch stats displays empty message', () => {
    cy.visit(`${clientUrl}/campaign/${campaignWithoutBatchStats}/details`);
    cy.wait(500);
    cy
      .get('[data-test=Metrics]')
      .click();
    cy
      .get('[data-test=empty-data-message]')
      .should('exist');
  });

  it('Successfully fetches stats and Shows Campaign stats', () => {
    cy.server();
    cy.route({ url: '**/campaigns/*/stats/**' }).as('stats');
    cy.visit(`${clientUrl}/campaign/${campaignWithBatchStats}/details`);

    cy
      .wait('@stats')
      .then(xhr => {
        expect(xhr.status).to.eq(200);
      });
  });
});
