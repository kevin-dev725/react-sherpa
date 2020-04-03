describe('DesktopView Test', () => {
  const NoDesktopComponent = '[data-test=no-app]';

  // setup
  before(() => {
    cy.login();
  });

  it('should render app on desktop', () => {
    cy.viewport(950, 800);
    cy
      .get(NoDesktopComponent)
      .should('not.be.visible');
  });
});
