describe('update account information', () => {
    const url = Cypress.env('clientUrl'),
          path = 'account-settings',
          dropDown = '[data-test=timezone-dropdown]',
          dropDownValue = '.react-select__single-value',
          dropDownPlaceholder = '.react-select__placeholder',
          companyName = '[data-test=user-company-setting]',
          userEmail = '[data-test=user-email-settings]',
          option = '.react-select__option'

    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('navigates to the correct path', () => {
        cy.visitAndCheckPath(url, path)
    });

    it('displays the correct company name and is not editable', () => {
            cy.get(companyName).should('be.disabled');
    });

    it('displayed the correct email/username and is not editable', () => {
        cy.get(userEmail).should('be.disabled');
    });

    it('updates the time zone, displays a success toast, receives a good xhr code', () => {
        cy.getState().then(({ auth }) => {
            const { company } = auth.userData;
            cy.server();
            cy.route({ url: `**/companies/${company.id}/`, method: 'PATCH' }).as('company-patch');
            cy.get(`${dropDown} div div input`).then($dropDown => {
                cy.wrap($dropDown).click({ force: true });
                cy.get(option)
                .then($option => {
                    cy.wrap($option).last().click({ force: true });
                    cy.checkForNewToast('alert-success');
                    cy.wait('@company-patch').then(xhr => {
                        expect(xhr.status).to.eq(200);
                    });
                });
            });
        });
    });

    it('reverts the timezone and display an error toast on error', () => {
        cy.getState().then(({ auth }) => {
            const { company } = auth.userData;
            cy.server();
            cy.route({ url: `**/companies/${company.id}/`, method: 'PATCH', response: {}, status: 500 }).as('company-patch-error');
            cy.get(`${dropDown} div div input`).then($dropDown => {
                cy.wrap($dropDown).click({ force: true });
                cy.get(option).then($option => {
                    cy.wrap($option).first().click({ force: true });
                    cy.wait('@company-patch-error').then(xhr => {
                        expect(xhr.status).to.eq(500);
                        cy.get(dropDownValue).contains(company.timezone)
                        cy.checkForNewToast('alert');
                    });
                });
            });
        });
    });
});
