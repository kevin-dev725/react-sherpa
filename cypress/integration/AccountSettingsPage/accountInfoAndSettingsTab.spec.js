describe('Account Info Settings Tab', () => {
  const url = Cypress.env('clientUrl');

  beforeEach(() => {
    cy.viewport(950, 800);
  });

  it('displays the markets list from the store filtered by active status', () => {
    cy.login();
    cy.server();
    cy.route({ url: '**/markets/**' }).as('markets');
    cy.visit(`${url}/account-settings`);

    cy.wait('@markets');

    cy.wait(1000); // allow the store to finish updates
    cy.getState()
      .then(store => {
        const { markets: { folders } } = store;
        const activeMarkets = folders.filter(market => market.isActive);

        cy.get('[data-test=acount-info-markets-list]')
          .children()
          .should('have.length', activeMarkets.length);
      });
  });

  it('displays the form when pressing the edit button', () => {
    cy
      .get('[data-test=market-item-1]')
      .should('exist')
      .click()

    cy
      .get('[data-test=market-edit-form]')
      .should('exist')
  });

  it('should show validation error', () => {
    cy
      .get('[data-test=market-edit-form]')
      .within(() => {
        cy
          .get('[data-test=market-form-submit]')
          .click()

        cy
          .get('[data-test=error-callForwardingNumber]')
          .should('exist')
      });
  });

  it('should show validation error', () => {
    cy.server();
    cy.route({ method: 'PATCH', url: '**/markets/*/**' }).as('updateMarket');
    cy
      .get('[data-test=market-edit-form]')
      .within(() => {
        cy
          .get('[name=callForwardingNumber]')
          .type('3333333333');

        cy
          .get('[data-test=market-form-submit]')
          .click()

        cy
          .wait('@updateMarket')
          .then(xhr => {
            expect(xhr.status).to.eq(200);
          });
      });
  });
});
