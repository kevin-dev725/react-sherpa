import { generateRandomString } from '../../helpers/functions';

describe('Prospect messages', () => {
  const messagesTab = '[data-test=messages-tab]',
    displayedData = '[data-test=displayed-data]',
    messages = `${messagesTab} ${displayedData} ul`,
    url = Cypress.env('clientUrl'),
    prospectNum = Cypress.env('testProspect'),
    prospectUrl = `${url}/prospect/${prospectNum}/details`,
    emptyMessagesText = 'Send a message to start a conversation with this prospect',
    messageUpdateTimer = Cypress.env('pollingTimer'),
    testMessage = generateRandomString(),
    messageColors = Cypress.env('cssColors');

  let messagesLength = 0;

  before(() => {
    cy.login();
  });

  it('renders the messages tab', () => {
    cy.server();
    cy.createFixture(`campaignProspects.json`, 'campaign-prospects/unread', 'GET', { qs: { expand: 'campaign' } })
    cy.route({ method: 'GET', url: `**/prospects/**` }).as('prospect');
    cy.route({ method: 'GET', url: `**/campaign-prospect/unread/**` }).as('campaign-prospect');
    cy.visit(`${prospectUrl}`);
    cy.wait('@prospect').then(() => {
      cy.get('[data-test=Messages]').contains('Messages');
    });
  });

  it('selects and renders the messages pane', () => {
    cy.get('[data-test=Messages]').click();
    cy.get('[data-test=Messages').should('have.class', 'active');
  });

  it('displays messages', () => {
    cy.reload();
    cy.login();
    cy.route({ method: 'GET', url: '**/prospects/**' }).as('prospect');
    cy.route({ method: 'GET', url: `**/campaign-prospects/unread/**` }).as('messages');
    cy.visit(`${prospectUrl}`);
    cy.get('[data-test=Messages]').click();
    cy.wait('@prospect');
    cy.wait('@messages');
    cy.get(messages).then($msgs => {
      cy.wrap($msgs)
        .find('li')
        .should('exist');
    });
  });

  it('sets the number of messages and displays the correct amount', () => {
    cy.get(`${messages} li`).then($msgs => {
      cy.wrap($msgs)
        .its('length')
        .then(len => {
          messagesLength = len;
          cy.wrap($msgs).should('have.length', messagesLength);
        });
    });
  });

  it('displays the correct background color for each message', () => {
    cy.get('[data-test=user-message]').each($msg => {
      cy.wrap($msg)
        .find('div')
        .children()
        .first()
        .should('have.css', 'background-color')
        .and('eq', messageColors.sherpaBlue);
    });
    cy.get('[data-test=prospect-message]').each($msg => {
      cy.wrap($msg)
        .find('div')
        .children()
        .first()
        .should('have.css', 'background-color')
        .and('eq', messageColors.sherpaWhite);
    });
  });

  it('displays the correct elements for each message', () => {
    cy.get(`${messages} li`).each($msg => {
      cy.wrap($msg)
        .find('div')
        .should('exist');
      cy.wrap($msg)
        .find('time')
        .should('exist');
    });
  });

  it('reads a messages then fails update and reverts it', () => {
    cy.server();
    cy.route(
      { method: 'PATCH', url: `**/sms-messages/*`, response: [], status: 400 }
    ).as('updateMessageRead');

    // simulate click
    cy
      .get(`${messages} li.unread.message`)
      .first()
      .click();

    cy.wait('@updateMessageRead');
    cy
      .get('[data-test=prospect-message]')
      .first()
      .should('have.class', 'unread');
    cy.checkForNewToast('alert-danger');
    cy.closeToasts();
  });

  it('reads a message and removes the unread class', () => {
    cy.server();
    cy.route(
      { method: 'PATCH', url: `**/sms-messages/*/`, response: [], status: 200 }
    ).as('updateMessageRead');
    let unreadMessagesCount = 0;
    cy
      .getState()
      .then(store => {
        const { campaignProspectStore: { campaignProspectsUnreadCount } } = store;
        cy
          .get(`${messages} li.unread.message`)
          .then($messages => { unreadMessagesCount = $messages.length });

        cy
          .get(`${messages} li.unread.message`)
          .first()
          .click()

        cy.wait('@updateMessageRead');

        cy
          .getState()
          .then(store2 => {
            if (unreadMessagesCount === 1) {
              assert.equal(
                campaignProspectsUnreadCount - 1,
                store2.campaignProspectStore.campaignProspectsUnreadCount
              );
            } else if (unreadMessagesCount > 1) {
              assert.equal(
                campaignProspectsUnreadCount,
                store2.campaignProspectStore.campaignProspectsUnreadCount
              );
            }
          });
        cy
          .get('[data-test=prospect-message]')
          .first()
          .should('not.have.class', 'unread');


      })
  });

  it('displays the new message input field', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form).should('exist');
        cy.wrap($form).should('exist');
        cy.wrap($form)
          .find('input')
          .should('exist');
        cy.wrap($form)
          .find('button[type=submit]')
          .should('exist');
      });
  });

  it('is disabled while there is no text', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .should('have.attr', 'value', '');
        cy.wrap($form)
          .find('button[type=submit]')
          .should('be.disabled');
      });
  });

  it('accepts inputs in the text field', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .type(testMessage)
          .should('have.attr', 'value', testMessage);
      });
  });

  it('adds the new message on submit', () => {
    cy.server();
    let startCount = 0;
    cy
      .getState()
      .then(store => {
        console.log("STORE", store)
        const { campaignProspectStore: { campaignProspectsUnread, campaignProspectsUnreadCount } } = store;
        startCount = campaignProspectsUnreadCount;

        cy.route({ method: 'POST', url: `**/prospects/${prospectNum}/send_message/` }).as('sendMessage');
        cy.route({
          method: 'POST',
          url: `**/prospects/*/mark_as_read/**`
        }).as('markAllMessagesAsRead');
        cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/messages/` }).as('getMessages');
        cy.get(messagesTab)
          .find('form')
          .within($form => {
            cy.wrap($form)
              .find('input')
              .clear()
              .type(testMessage);
            cy.wrap($form)
              .find('button[type=submit]')
              .click();
          });
        cy.wait('@sendMessage');
        cy.wait('@markAllMessagesAsRead');
        cy.wait('@getMessages');
        cy.get(`${messages} li`).should('have.length', messagesLength + 1);
        cy
          .get('[data-test=prospect-message]')
          .each($message => {
            cy
              .wrap($message)
              .should('not.have.class', 'unread');
          });


        cy
          .getState()
          .then(store2 => {
            console.log(store2)
            const campaignId = store2.prospectStore.prospects[prospectNum].campaigns[0].id;
            assert.equal(
              store2.campaignProspectStore.campaignProspectsUnreadCount, startCount - 1
            );
            assert.equal(
              store2.campaignProspectStore.campaignProspectsUnread[campaignId].length,
              store.campaignProspectStore.campaignProspectsUnread[campaignId].length - 1
            );
          })
      });

  });

  it('displays the new message', () => {
    cy.get(`${messages} li`)
      .first()
      .then($msg => {
        cy.wrap($msg)
          .find('div')
          .contains(testMessage);
        cy.wrap($msg).should('have.attr', 'data-test', 'user-message');
      });
  });

  it('display a failure toast on message send fail', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: `**/prospects/${prospectNum}/send_message`,
      status: 500,
      response: {}
    }).as('sendMessage');
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .clear()
          .type('failure message');
        cy.wrap($form)
          .find('button[type=submit]')
          .click();
      });
    cy.wait('@sendMessage');
    cy.checkForNewToast('alert-danger');
  });

  it(`updates messages periodically every ${messageUpdateTimer} seconds`, () => {
    let startTime;
    let stopTime;
    const timer = (messageUpdateTimer + 5) * 1000;
    const options = { requestTimeout: timer, responseTimeout: timer };
    // has to reload page to reset polling timer
    cy.reload();
    cy.login();
    cy.server();
    cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/**` }).as('prospect');
    cy.visit(`${prospectUrl}`);
    cy.wait('@prospect', options).then(() => {
      startTime = Date.now();
    });
    cy.route({
      method: 'GET',
      url: `**/prospects/${prospectNum}/messages`,
      response: []
    }).as('pollingCheck');
    cy.wait('@pollingCheck', options).then(req => {
      stopTime = Date.now();
      const totalTime = ((stopTime - startTime) / 1000).toFixed();
      assert.isNotNull(req.response.body, `full api request has completed`);
      assert.isAbove(
        totalTime,
        messageUpdateTimer - 5,
        `${messageUpdateTimer - 5} seconds is less than ${totalTime} seconds`
      );

      assert.isBelow(
        totalTime,
        messageUpdateTimer + 5,
        `${totalTime} seconds is less than ${messageUpdateTimer + 5} seconds`);
    });
  });
});
