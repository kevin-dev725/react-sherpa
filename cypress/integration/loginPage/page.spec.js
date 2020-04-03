describe('Login form', () => {
  const emailInput = 'input[name="username"]',
    passwordInput = 'input[name="password"]',
    emailValue = 'george@asdf.com',
    passwordValue = 'testu123',
    url = Cypress.env('clientUrl');

  beforeEach(() => {
    cy.visit(`${url}/login`);
  });

  it('has both login fields', () => {
    cy.get('input').should('have.length', 2);
  });

  it('has "required" attribute for both fields', () => {
    cy.get(emailInput).should('have.attr', 'required');

    cy.get(passwordInput).should('have.attr', 'required');
  });

  it('should have the correct email and password attributes', () => {
    cy.get(emailInput).should('have.attr', 'type', 'email');

    cy.get(passwordInput).should('have.attr', 'type', 'password');
  });

  it('should have a disabled submit button when fields are empty', () => {
    cy.get(emailInput).should('have.value', '');

    cy.get(passwordInput).should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('accepts inputs', () => {
    cy.get(emailInput)
      .type(emailValue)
      .should('have.value', emailValue);

    cy.get(passwordInput)
      .type(passwordValue)
      .should('have.value', passwordValue);
  });

  it('should not have a disabled submit button when fields are not empty', () => {
    cy.get(emailInput)
      .type(emailValue)
      .should('have.value', emailValue);

    cy.get(passwordInput)
      .type(passwordValue)
      .should('have.value', passwordValue);

    cy.get('button').should('not.be.disabled');
  });

  it('fails login verification and displays an error message', () => {
    cy.server();
    cy.route('POST', '**/auth/jwt/create').as('loginReq');
    cy.get(emailInput).type(emailValue);
    cy.get(passwordInput).type('incorrectPassword');
    cy.get('button').click();
    cy.wait('@loginReq');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });

    cy.get('[data-test=login-form-error]').should('not.be.empty');
  });

  it('successfully logs in', () => {
    cy.server();
    cy.route('POST', '**/auth/jwt/create').as('loginReq');
    cy.get(emailInput).type(emailValue);
    cy.get(passwordInput).type(passwordValue);
    cy.get('button').click();
    cy.wait('@loginReq');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('successfully fetches userInfo on page reload', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.route({ method: 'GET', url: '**/auth/users/me/' }).as('fetchUserInfo');
    cy.wait('@fetchUserInfo')
      .then(xhr => {
        console.log(xhr)
        expect(xhr.status).to.eq(200);
      });
  });
});
