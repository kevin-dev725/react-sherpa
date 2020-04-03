describe('Support page', () => {
  const url = Cypress.env('clientUrl');
  const supportText =
    'We are dedicated to helping you succeed. Browse some of our support resources below.';
  const displayedData = '[data-test=displayed-data]';
  const supportCards = '[data-test=support-card]';
  before(() => {
    cy.login();
  });

  it('renders support page route and makes a successful api call', () => {
    cy.server();
    cy.route({ url: '**/support-links', response: 'fixture:support.json' }).as('support-links');
    cy.visit(`${url}/support`);
    cy.wait('@support-links').then(xhr => {
      expect(xhr.status).to.eq(200);
    });
    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('displays the correct amount of support cards', () => {
    cy.fixture('support').then(support => {
      cy.get(supportCards).should('have.length', support.results.length);
    });
  });
});
