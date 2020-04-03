describe('campaign send tab', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testMarket'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`,
    sendTab = '[data-test=Send]',
    smsTemplateDropDown = '[data-test=sms-template-dropdown]',
    option = '.dropdown-item',
    messagingDisabled = '[data-test=disabled-messaging-message]',
    disabledReasons = Cypress.env('messagingDisabled')

  before(() => {
    cy.login();
    cy.createFixture(`campaigns.json`, `campaigns`, 'GET', {
      qs: { market: marketId, ordering: '-created', is_archived: false }
    });
    cy.createFixture(`batchTemplates${campaignId}.json`, `campaigns/${campaignId}/batch_prospects`);
  });

  it('navigates to the correct screen', () => {
    cy.stubResponse({
      url: `campaigns/*`,
      method: 'GET',
      response: `campaigns`
    }).then(res => {
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(`@${res.alias}`);
      cy.location().should(location => {
        expect(location.pathname).to.eq(`/${campaignUrl}`);
      });
    });
  });

  it('selects and highlights the send tab', () => {
    cy.get(sendTab).click({ force: true });
    cy.get(sendTab).should('have.class', 'active');
  });

  it('populates the templates drop down', () => {
    cy.getState().then(({ smsTemplates: { templates } }) => {
      const templatesArr = Object.values(templates);
      cy.get(smsTemplateDropDown)
        .find(option)
        .each(($option, idx) => {
          cy.wrap($option).contains(templatesArr[idx].templateName);
        });
    });
  });

  it('displays the correct preview message on load', () => {
    cy.fixture(`campaigns`).then(fixture => {
      const campaign = fixture.results.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      cy.getState().then(({ smsTemplates: { templates } }) => {
        const { message } = templates[campaign[campaignId].smsTemplate];
        cy.get('[data-test=sms-template-preview]').contains(message);
      });
    });
  });

  it('displays the correct preview message and full message after changing template', () => {
    cy.server();
    // cy.route({ url: `**/campaigns/*`, method: 'GET' });
    cy.route({ url: `**/campaigns/${campaignId}/batch_prospects/**`, method: 'GET' }).as(
      'batch-prospects'
    );
    cy.get(smsTemplateDropDown)
      .find(option)
      .each(($option, idx) => {
        cy.get(smsTemplateDropDown).click({ force: true })
        cy.get(smsTemplateDropDown).find(option).eq(idx).click({ force: true })
        cy.wait('@batch-prospects');
        cy.getState().then(state => {
          const { message: templateMsg } = state.smsTemplates.templates[$option[0].value];
          cy.get('[data-test=sms-template-preview]').contains(templateMsg);
          const { smsMsgText: smsMsg } = state.campaignsBatchProspectsStore.campaignsBatchProspects[0];
          cy.get('[data-test=batch-prospect-message]').contains(smsMsg);
        });
      });
  });

  it('displays a loading spinner while new message template is loading', () => {
    cy.server();
    cy.stubResponse({
      url: `campaigns/${campaignId}/batch_prospects/**`,
      response: 'batchTemplates1',
      delay: 500
    }).then(res => {
      cy.get(smsTemplateDropDown)
        .find(option)
        .each(($option, idx) => {
          cy.get(smsTemplateDropDown).click({ force: true });
          cy.get(smsTemplateDropDown).find(option).eq(idx).click({ force: true })
          cy.get('[data-test=spinner]').should('exist');
          cy.get('[data-test=batch-prospect-message]').should('not.exist');
          cy.wait(`@${res.alias}`);
          cy.get('[data-test=spinner]').should('not.exist');
          cy.get('[data-test=batch-prospect-message]').should('exist');
        });
    });
  });

  it('changes the batch messages to next batch message after clicking send button', () => {
    cy.server();
    cy.route({ method: 'POST', url: `**/batch_send/**` }).as('batch-send');
    cy.get('[data-test=batch-send-button]').click({ force: true });
    cy.wait('@batch-send').then(({ xhr }) => {
      expect(xhr.status).to.be.equal(200);
      cy.getState().then(state => {
        const { smsMsgText: smsMsg } = state.campaignsBatchProspectsStore.campaignsBatchProspects[1];
        cy.get('[data-test=batch-prospect-message]').contains(smsMsg);
      });
    });
  });


  it('displays the correct message when messages are blocked for "time"', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.fixture('campaigns').then(fixture => {
      const newFixture = {
        ...fixture,
        results: fixture.results.map(result => ({
          ...result,
          blockReason: "time"
        }))
      }
      cy.route({ url: `**/campaigns/?ordering=-created_date&market=2&is_archived=false&page_size=20`, response: newFixture }).as('campaigns')
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait('@campaigns');
      cy.get(messagingDisabled).contains(disabledReasons.time);
    })
  });

  it('displays the correct message when messages are blocked for "active-numbers"', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.fixture('campaigns').then(fixture => {
      const newFixture = {
        ...fixture,
        results: fixture.results.map(result => ({
          ...result,
          blockReason: "active-numbers"
        }))
      }
      cy.route({ url: `**/campaigns/?ordering=-created_date&market=2&is_archived=false&page_size=20`, response: newFixture }).as('campaigns')
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait('@campaigns');
      cy.get(messagingDisabled).contains(disabledReasons['active-numbers']);
    })
  });
});
