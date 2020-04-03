describe('Tests the cycling workflow', () => {
  const url = Cypress.env('clientUrl');
  const marketId = Cypress.env('testCampaign');
  const campaignId = Cypress.env('testCampaign');
  const campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`;
  const swipeableListItem = '[data-test=swipeable-list-item]';

  it('cycles through prospect details', () => {
    cy.login();
    cy.visit(`${url}/${campaignUrl}`);

    cy.get("[data-test=Messages]")
      .click()

    cy
      .get(swipeableListItem)
      .find('[data-test=list-item-link]')
      .first()
      .click({ force: true, multiple: true })

    cy
      .url()
      .then(url => {
        cy
          .get('[data-test=prospect-cycle-right]')
          .click({ force: true });

        cy
          .get('[data-test=spinner]')
          .should('not.exist');

        cy
          .url()
          .should('not.eq', url)
      });
  });
});
