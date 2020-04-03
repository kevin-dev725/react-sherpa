describe('Tests the account settings permission', () => {
  const url = Cypress.env('clientUrl');
  const prospectId = Cypress.env('testProspect');


  it('renders accounts page icon on the navbar if user has permissions', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.server();
    cy.route({ url: '**/auth/users/me/' }).as('fetchUserInfo');

    cy.wait('@fetchUserInfo');
    cy.getState()
      .then(store => {
        const { auth: { userData: { profile } } } = store;

        if (profile.role === "admin" || profile.role === "master_admin") {
          cy.get('[data-test="desktop-nav-Account Settings"]').should('exist');
        } else {
          cy.get('[data-test="desktop-nav-Account Settings"]').should('not.exist');
        }
      });
  })
});
