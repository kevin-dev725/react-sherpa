describe('Prospect details tab', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    campaignId = Cypress.env('testCampaign'),
    prospectUrl = `prospect/${prospectId}/details`,
    leadStagesDropDown = '[data-test=prospect-lead-stages-drop-down]',
    agentDropDown = '[data-test=agent-drop-down]',
    dropdownValue = '[data-test=dropdown-value]',
    dateTime = '[data-test=reminder-date-picker]',
    crmBtn = '[data-test=email-to-crm-btn]',
    zapierBtn = '[data-test=push-to-zapier-btn]',
    actionButtons = '[data-test=status-action-button]',
    option = '.dropdown-item',
    modalClose = '.modal-header button',
    submitBtn = "[data-test='crm-modal-submit']"

  const actions = ['Priority', 'Qualified'];

  before(() => {
    cy.login();
    cy.createFixture(`prospect${prospectId}Details.json`, `prospects/${prospectId}`, 'GET', {
      qs: { expand: 'campaigns', sms_relay_map: 'sms_relay_map' }
    });
  });

  it('renders the details tab', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `prospects/${prospectId}/*`,
      response: `prospect${prospectId}Details`
    }).then(res => {
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait(`@${res.alias}`);
    });
    cy.get('[data-test=Details]').click({ force: true });
    cy.get('[data-test=Details]').should('have.class', 'active');
  });

  it('clicks each action button, has valid response with correct payload when toggling', () => {
    cy.server();
    cy.route({ method: 'PATCH', url: `**/prospects/${prospectId}` }).as('prospect');

    const actions = ['ownerVerifiedStatus', 'doNotCall', 'isPriority', 'isQualifiedLead'];
    const prospectStatus = {};

    cy.get(actionButtons).each(($button, idx) => {
      if ($button[0].innerText !== "DNC") {
        console.log("BTN", $button[0].innerText);
        cy.wrap($button).click({ force: true });

        cy.wait('@prospect').then(xhr => {
          cy.wrap($button)
          cy.wrap(xhr)
            .its('status')
            .should('eq', 200);

          const currentAction = actions[idx],
            reqStatus = xhr.request.body[currentAction],
            resStatus = xhr.response.body[currentAction];

          prospectStatus[currentAction] = reqStatus;

          expect(reqStatus).to.eq(resStatus);
        });
        //should toggle back previous state
        cy.wrap($button).click({ force: true });
        cy.wait('@prospect').then(xhr => {
          cy.wrap(xhr)
            .its('status')
            .should('eq', 200);

          const currentAction = actions[idx],
            resStatus = xhr.response.body[currentAction];

          if (currentAction === 'ownerVerifiedStatus') {
            if (prospectStatus[currentAction] === 'verified') {
              expect(resStatus).to.eq('unverified');
            } else {
              expect(resStatus).to.eq('verified');
            }
          } else {
            expect(resStatus).to.eq(!prospectStatus[currentAction]);
          }
        });
      }
    });
  });

  it('makes a successful API call for each leadstage in dropdown', () => {
    cy.server();
    cy.route({
      url: `**/prospects/*`,
      method: 'PATCH',
    }).as('lead-stage');
    cy.get(leadStagesDropDown)
      .find(option)
      .then($options => {
        for (let i = 1; i < $options.length; i++) {
          cy.get(leadStagesDropDown).click({ force: true });
          cy.get(leadStagesDropDown).find(option).eq(i).click({ force: true })
          cy.wait('@lead-stage').then(xhr => {
            expect(xhr.status).to.eq(200);
          });
        }
      });
  });

  it('has the correct agents in the agent selector, selects each option', () => {
    cy.server();
    cy.route({ url: '**/prospects/*', method: 'PATCH' }).as('agents');
    cy.getState().then(({ auth }) => {
      cy.get(agentDropDown)
        .find(option)
        .then($options => {
          console.log($options.length)
          for (let i = 1; i < $options.length; i++) {
            cy.get(agentDropDown).click({ force: true });
            console.log('test')
            cy.get(agentDropDown).find(option).eq(i).click({ force: true });
            cy.wait('@agents').then(xhr => {
              expect(xhr.status).to.eq(200);
              cy.get(dropdownValue).contains(auth.userData.company.profiles[i - 1].user.fullName);
            });
          }
        });
    });
  });


  it('displays the date picker component', () => {
    cy.get(dateTime).should('exist');
  });

  it('picks a date, receives a status code 200 and the correct response', () => {
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/set_reminder`, method: 'POST' }).as('set-reminder');
    cy.get(dateTime).click({ force: true });
    cy.get('.rdt')
      .find(`tbody`)
      .then($tbody => {
        cy.wrap($tbody)
          .find('td')
          .last()
          .then($td => {
            cy.wrap($td).click({ force: true });
          });
      });
    cy.get('.modalBackPlate').click({ force: true });
    cy.wait('@set-reminder').then(xhr => {
      const reqDate = xhr.request.body.time,
        resDate = xhr.response.body.reminderDateUtc,
        status = xhr.status;
      expect(status).to.be.gte(200);
      expect(resDate).to.eq(reqDate);
    });
  });

  it('displays sent state for "Email to CRM" button if prospect has been sent to CRM', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.emailedToPodio = true;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/**`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(crmBtn).should('be.disabled');
    });
  });

  it('Email to CRM button is disabled if there is no campaign email', () => {
    cy.reload();
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/**`,
        response: [{ id: campaignId, name: 'test campaign', podioPushEmailAddress: null  }]
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(crmBtn).click({ force: true });
      cy.get('input[type=radio]').first().click({ force: true });
      cy.get(modalClose).click({ force: true });
      cy.wait('@prospect-details')
      cy.get(crmBtn).should('be.disabled');
    });
  });

  it('Clicks email to CRM button, displays a loading spinner, and receives a valid response and status of 200', () => {
    cy.login();
    cy.visit(`${url}/${prospectUrl}`);
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/email_to_podio/`, method: 'POST' }).as(
      'email-podio'
    );
    cy.get(crmBtn).click({ force: true });
    cy.get('input[type=radio]').first().click({ force: true });
    cy.get(submitBtn).click({ force: true });
    cy.get(submitBtn)
      .find('[data-test=loading-spinner]')
      .should('exist');
    cy.wait('@email-podio').then(xhr => {
      cy.get(crmBtn)
        .find('[data-test=loading-spinner]')
        .should('not.exist');
      expect(xhr.status).to.eq(200);
    });
  });

  it('displays sent state for "Push to Zapier" button if prospect has been pushed to zapier', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.pushedToZapier = true;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/**`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(zapierBtn).should('be.disabled');
    });
  });

  it('Push to zapier button is disabled if there is no campaign zapier webhook', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.campaigns[0].zapierWebhook = null;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/**`,
        response: [{ id: campaignId, name: 'test campaign', zapierWebhook: null  }]
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(zapierBtn).click({ force: true });
      cy.get('input[type=radio]').first().click({ force: true });
      cy.get(modalClose).click({ force: true });
      cy.wait('@prospect-details')
      cy.get(zapierBtn).should('be.disabled');
    });
  });

  it('Clicks push to zapier button, displays a loading spinner, and receives a valid response and status of 200', () => {
    cy.login();
    cy.visit(`${url}/${prospectUrl}`);
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/push_to_zapier/`, method: 'POST', response: [] }).as(
      'push-zapier'
    );
    cy.get(zapierBtn).click({ force: true });
    cy.get('input[type=radio]').first().click({ force: true });
    cy.get(submitBtn).click({ force: true });
    cy.get(submitBtn)
      .find('[data-test=loading-spinner]')
      .should('exist');
    cy.wait('@push-zapier').then(xhr => {
      cy.get(zapierBtn)
        .find('[data-test=loading-spinner]')
        .should('not.exist');
      expect(xhr.status).to.be.gte(200);
    });
  });
});
