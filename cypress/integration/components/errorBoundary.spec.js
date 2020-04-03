describe('Error boundary tests', () => {
  const errorBoundary = '[data-test=error-boundary]';
  const url = Cypress.env('clientUrl');

  before(() => {
    cy.login();
  });

  it('displays the error component when is error, does not display error component after route changes', () => {
    cy.visit(`${url}/support`);
    const badData = [{
      id: 1,
      icon: null,
      title: {},
      description: {},
      url: '#'
    }];;
    cy.dispatchAction({ type: 'SET_SUPPORT_ITEMS', items: badData }).then(() => {
      cy.getState().then(state => {
        console.log(state);
      });
    });
    // don't stop tests on error
    Cypress.on('uncaught:exception', () => false);
    cy.get(errorBoundary).should('exist');
    cy.visit(`${url}/prospects`);
    cy.get(errorBoundary).should('not.exist');
  });
});
