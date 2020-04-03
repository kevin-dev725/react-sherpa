describe('Prospect details page', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    prospectUrl = `prospect/${prospectId}/details`;

  before(() => {
    cy.login();
  });

  it('opens the correct page', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `prospects/${prospectId}/**`,
      response: `prospect${prospectId}`
    });
    cy.visit(`${url}/${prospectUrl}`);
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/${prospectUrl}`);
    });
  });

  it('displays the correct tabs', () => {
    cy.get('[data-test=Details]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Messages]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Notes]')
      .should('exist')
      .and('be.visible');
  });

  it('takes the user back to the unread-messages when clicking the back button', () => {
    cy.login();
    cy.server();
    cy.route({ url: '**/campaign-prospects/unread/**' }).as('unread-messages');
    cy.visit(`${url}/new-messages`);

    cy.wait('@unread-messages')

    cy.get('[data-test=list-item-link]')
      .first()
      .click({ force: true });

    cy
      .get('[data-test=prospect-details-back-button]')
      .contains('Unread Messages')
      .click({ force: true })
      .then(() => {
        cy.location().should(location => {
          expect(location.pathname).to.eq('/new-messages');
        })
      })
  });

  it('takes the user back to the campaign-details when clicking the back button', () => {
    cy.login();
    cy.server();
    cy.route({ url: '**/campaign-prospects/**' }).as('campaign-messages');
    cy.visit('http://localhost:3000/markets/2/campaigns/1/details');

    cy.wait('@campaign-messages')

    cy.get('[data-test=list-item-link]')
      .first()
      .click({ force: true });

    cy
      .get('[data-test=prospect-details-back-button]')
      .contains('Campaign Details')
      .click({ force: true })
      .then(() => {
        cy.location().should(location => {
          expect(location.pathname).to.eq('/markets/2/campaigns/1/details');
        })
      })
  });
});
