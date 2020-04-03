describe('desktop campaigns unread messages tab', () => {
  const url = Cypress.env('clientUrl'),
    unreadMessagesTab = '[data-test=unread-messages-tab]',
    listItem = '[data-test=list-item]',
    messages = '[data-test=messages-tab]',
    prospectCard = '[data-test=prospect-card]'

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
  })

  it('displays the correct prospect detail in the messages pane', () => {
    cy.visit(`${url}/campaigns`);
    cy.get('[data-test="All Unread"]').click({ force: true });
    cy.get(unreadMessagesTab).find(`${listItem}`).each(($item, idx) => {
      cy.wrap($item).find('div .stretched-link').click({ force: true });
      cy.wrap($item).find('[data-test=list-item-header] h5 span').then($header => {
        cy.get(`${prospectCard} h2`).contains($header[0].textContent)
      })
    })
  });

  it('displays the correct messages when first visiting the tab', () => {
    cy.reload();
    cy.login();
    cy.visit(`${url}/campaigns`);
    cy.get('[data-test="All Unread"]').click({ force: true });
    cy.getState().then(({ campaignProspectStore, prospectDetailsReducer }) => {
      const { campaignProspectsUnread: unreadMesagesStore } = campaignProspectStore,
        firstProspect = unreadMesagesStore[1][0],
        { prospectMessages: { list: messagesList } } = prospectDetailsReducer,
        firstProspectMessages = messagesList[firstProspect.id],
        messagesArray = Object.values(firstProspectMessages).reverse();

      cy.get(messages).find('li').each(($message, idx) => {
        cy.wrap($message).find('div div').contains(messagesArray[idx].message)
      })
    })
  });
});
