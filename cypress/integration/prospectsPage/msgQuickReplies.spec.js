describe('Message quick replies', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    emptyQuickRepliesMessage = Cypress.env('emptyQuickRepliesMessage');

  before(() => {
    cy.login();
    cy.createFixture(`quickReplies.json`, `prospects/${prospectId}/quick_replies`, 'GET');
  });

  it('displays quick reply pop-up when button is clicked', () => {
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/quick_replies`, method: 'GET', response: `fixture:quickReplies` }).as('quick-replies');
    cy.visit(`${url}/prospect/${prospectId}/details`);
    cy.wait('@quick-replies');
    cy.get('[data-test=Messages]').click({ force: true });
    cy.get('[data-test=quick-reply-btn]').then($btn => {
      cy.wrap($btn).should('exist');
      cy.wrap($btn).click({ force: true });
      cy.get('[data-test=quick-replies]').should('exist');

    });
  });

  it('displays the correct quick replies', () => {
    cy.getState().then(({ smsTemplates }) => {
      cy.get('[data-test=quick-replies]').find('li').each(($reply, idx) => {
        const storeReply = smsTemplates.quickReplies[idx];
        cy.wrap($reply).contains(storeReply.question);
      });
    });
  });

  it('adds the correct text to the message input after clicking on the quick reply', () => {
    cy.getState().then(({ smsTemplates }) => {
      smsTemplates.quickReplies.forEach(($reply, idx) => {
        const message = $reply.message;
        cy.get('[data-test=quick-reply-btn]').click({ force: true });
        cy.get('[data-test=quick-replies]').find('li').eq(idx).click({ force: true });
        cy.get('[data-test=message-input]').then($input => {
          cy.wrap($input).should('have.value', message);
          cy.wrap($input).clear({ force: true });
        });
      });
    });
  });

  it('displays a special message when there are no quick replies', () => {
    cy.login();
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/quick_replies`, method: 'GET', response: [] }).as('quick-replies');
    cy.visit(`${url}/prospect/${prospectId}/details`);
    cy.wait('@quick-replies');
    cy.get('[data-test=quick-reply-btn]').click({ force: true });
    cy.get('[data-test=empty-data-message]').contains(emptyQuickRepliesMessage);
  });
});
