describe('change password', () => {
  const url = Cypress.env('clientUrl'),
    path = 'account-settings',
    changePasswordBtn = '[data-test=change-password-btn]',
    changePasswordInputs = '[data-test=change-password-input]',
    currentPassword = Cypress.env('password'),
    newPassword = `${currentPassword}123`,
    badPassword = `lt8`,
    submitBtn = '[data-test=submit-new-password-btn]',
    networkError = '[data-test=password-validation-api-error]',
    validationErrorMessage = '[data-test=password-validation-error-message]';

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.viewport(950, 800);
  });

  it('navigates to the correct path', () => {
    cy.visit(`${url}/${path}`);
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/${path}`);
    });
  });

  it('fails validation if any fields are empty', () => {
    cy.get(changePasswordBtn).click();
    cy.get(submitBtn).click();
    cy.get(changePasswordInputs).then($input => {
      cy.get(validationErrorMessage).should('have.length', $input.length);
      cy.get(validationErrorMessage).each($msg => cy.wrap($msg).should('be.visible'));
    });
  });

  it('validates the new passwords match before api submission', () => {
    cy.get(changePasswordInputs).eq(0).type(currentPassword).should('have.value', currentPassword);
    cy.get(changePasswordInputs).eq(1).type(newPassword).should('have.value', newPassword);
    cy.get(changePasswordInputs).eq(2).type(newPassword + "123").should('have.value', newPassword + "123");
    cy.get(submitBtn).click();
    cy.get(validationErrorMessage).should('exist');
    cy.get(changePasswordInputs).each($input => cy.wrap($input).clear());
  });

  it('validates the new password length >= 8 characters before api submission', () => {
    cy.get(changePasswordInputs).eq(0).type(currentPassword).should('have.value', currentPassword);
    cy.get(changePasswordInputs).eq(1).type(badPassword).should('have.value', badPassword);
    cy.get(changePasswordInputs).eq(2).type(badPassword).should('have.value', badPassword);
    cy.get(submitBtn).click();
    cy.get(validationErrorMessage).should('exist');
    cy.get(changePasswordInputs).each($input => cy.wrap($input).clear());
  });

  it('makes api call and displays loading spinner', () => {
    cy.get(changePasswordInputs).eq(0).type(currentPassword).should('have.value', currentPassword);
    cy.get(changePasswordInputs).eq(1).type(newPassword).should('have.value', newPassword);
    cy.get(changePasswordInputs).eq(2).type(newPassword).should('have.value', newPassword);
    cy.server();
    cy.route({ url: `**/auth/users/set_password/**`, method: 'POST' }).as('set-password');
    cy.get(submitBtn).click();
    cy.get('[data-test=loading-spinner]').should('exist');
    cy.wait('@set-password').then(xhr => {
      expect(xhr.status).to.eq(204);
    });
  });

  it('displays an error message on fail', () => {
    // password is now changed so attempting to use the previous password gets a bad network response
    cy.server();
    cy.route({ url: `**/auth/users/set_password/**`, method: 'POST' }).as('set-password');
    cy.get(changePasswordBtn).click();
    cy.get(changePasswordInputs).eq(0).type(currentPassword).should('have.value', currentPassword);
    cy.get(changePasswordInputs).eq(1).type(newPassword).should('have.value', newPassword);
    cy.get(changePasswordInputs).eq(2).type(newPassword).should('have.value', newPassword);
    cy.get(submitBtn).click();
    cy.wait('@set-password').then(xhr => {
      expect(xhr.status).to.eq(400);
      cy.get(networkError).should('exist');
    });
  });

  it('resets password back to original to avoid breaking other tests that depend on old password', () => {
    cy.get(changePasswordInputs).each($input => cy.wrap($input).clear());
    cy.get(changePasswordInputs).eq(0).type(newPassword).should('have.value', newPassword);
    cy.get(changePasswordInputs).eq(1).type(currentPassword).should('have.value', currentPassword);
    cy.get(changePasswordInputs).eq(2).type(currentPassword).should('have.value', currentPassword);
    cy.server();
    cy.route({ url: `**/auth/users/set_password/**`, method: 'POST' }).as('set-password');
    cy.get(submitBtn).click();
    cy.wait('@set-password').then(xhr => {
      expect(xhr.status).to.eq(204);
    });
  });
});
