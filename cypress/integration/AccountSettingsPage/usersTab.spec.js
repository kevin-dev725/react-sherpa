describe('Users Tab', () => {
  const url = Cypress.env('clientUrl');

  beforeEach(() => {
    cy.viewport(950, 800);
  });

  it('displays users list in alphabetical order', () => {
    cy.login();
    cy.server();
    cy.route({ url: '**/markets/**' }).as('markets');
    cy.visit(`${url}/account-settings`);

    cy.wait('@markets');

    cy.wait(1000); // allow the store to finish updates
    cy.getState()
      .then(store => {
        const { auth: { userData: { company: { profiles } } } } = store;

        cy.get('[data-test=accounts-page-users-tab]')
          .click()

        profiles.forEach(({ id }) => {
          cy.get(`[data-test=user-${id}]`)
            .should('exist')
        })
      });
  });
});
