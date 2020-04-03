describe('data loader wrapper component', () => {
  const spinner = '[data-test=spinner]',
    displayedData = '[data-test=displayed-data]',
    emptyDataMsg = '[data-test=empty-data-message]',
    networkErrorMsg = '[data-test=network-error-message]',
    delay = 5000,
    url = Cypress.env('clientUrl');

  before(() => {
    cy.login();
  });

  it('displays the spinner during a network request', () => {
    cy.server();
    cy.stubResponse({ url: 'support-links', response: 'support', delay }).then(res => {
      cy.visit(`${url}/support`);
      cy.get(spinner).should('exist');
      cy.wait(`@${res.alias}`);
      cy.get(spinner).should('not.exist');
    });
  });

  it('displays data when no spinner or network error', () => {
    cy.get(spinner).should('not.exist');
    cy.get(displayedData).should('exist');
  });

  it('display an error message when is network error and no data', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.stubResponse({ url: 'support-links', response: 'support', status: 500 });
    cy.visit(`${url}/support`);
    cy.get(displayedData).should('not.exist');
    cy.get(networkErrorMsg).should('exist');
    cy.get(emptyDataMsg).should('not.exist');
  });

  it('displays data when is both an error and data', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.visit(`${url}/support`);
    cy.get(displayedData).should('exist');
    cy.get(networkErrorMsg).should('not.exist');
    cy.get(emptyDataMsg).should('not.exist');
  });

  it('displays an empty data message when no data or network error exists', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.stubResponse({ url: 'support-links', response: 'empty' });
    cy.visit(`${url}/support`);
    cy.get(displayedData).should('not.exist');
    cy.get(networkErrorMsg).should('not.exist');
    cy.get(emptyDataMsg).should('exist');
  });
});
