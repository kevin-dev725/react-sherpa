describe('No App screen', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.viewport(300, 600);
  });

  it('displays the mobile app when the user has an active subscription', () => {
    // wait for state to get updated with userData.company to avoid throwing an error
    cy.wait(2000);
    cy.getState().then(state => {
      const userData = state.auth.userData;
      console.log(state.auth.userData);;
      userData.company.subscriptionStatus = 'active';
      cy.dispatchAction({ type: "SET_USER_DATA", userData });
      cy.get('[data-test=no-app]').should('not.exist');
    });
  });

  it('does not display app and instead displays the NoApp component on mobile when the user does not have an active subscription, does not display it after switching to the desktop view', () => {
    // wait for state to get updated with userData.company to avoid throwing an error
    cy.wait(2000);
    cy.getState().then(state => {
      const userData = state.auth.userData;
      userData.company.subscriptionStatus = 'inactive';
      cy.dispatchAction({ type: "SET_USER_DATA", userData });
      cy.get('[data-test=no-app]').should('exist');
      cy.viewport(1024, 768);
      cy.get('[data-test=no-app]').should('not.exist');
    });
  });
});
