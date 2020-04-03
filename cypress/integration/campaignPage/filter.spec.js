describe('Filter functionality', () => {
  const url = Cypress.env('clientUrl'),
    company = Cypress.env('testCompany'),
    marketId = Cypress.env('testMarket'),
    campaignUrl = `markets/${marketId}/campaigns`,
    filterBtn = '[data-test=filter-btn]',
    applyFilterBtn = '[data-test=apply-filter]',
    listItem = '[data-test=list-item]',
    itemHeader = '[data-test=list-item-header]';

  before(() => {
    cy.login();
    cy.createFixture(`market${marketId}campaigns.json`, `campaigns`, 'GET', {
      qs: { market: marketId, is_archived: false }
    });
    cy.createFixture(`market${marketId}owners.json`, `companies/${company}`, 'GET');
  });

  it('navigates to campaign page path', () => {
    cy.server();
    cy.stubResponse({ url: `campaigns/**`, response: `market${marketId}campaigns` }).then(res => {
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(`@${res.alias}`);
      cy.location().should(location => {
        expect(location.pathname).to.eq(`/${campaignUrl}`);
      });
    });
  });

  it('renders the campaigns for the selected market', () => {
    cy.get('[data-test=displayed-data]').should('exist');
  });

  // Open the modal
  it('renders the modal', () => {
    cy.get(filterBtn)
      .click({ force: true });
  });

  // Selects first option in modal
  it('selects the first item in the modal', () => {
    cy.server();
    cy.route({ url: `**/campaigns/**`, method: 'GET' }).as('camps')

    cy.getState()
      .then(store => {
        const { auth: { userData: { company: { profiles } } } } = store;
        const activeUsers = profiles.filter(profile => profile.user.isActive);

        activeUsers.forEach(user => {
          cy.get(filterBtn)
            .click({ force: true });

          cy.get('[data-test=filter-radio]').each($radio => {
            if ($radio[0].id === `${user.user.id}`) {
              cy.wrap($radio)
                .click({ force: true }).then(() => {
                  cy.get(applyFilterBtn)
                    .click({ force: true });

                  // Wait for the test so it doesn't fail on a slow connection
                  cy.wait(`@camps`);

                  cy.getState().then(({ campaigns: { campaigns, sortOrder } }) => {
                    const campaignArr = sortOrder.map(item => campaigns[item]);

                    // Checking the UI element is correct per the store
                    if (Cypress.dom.isDom(listItem)) {
                      cy.get(listItem).each(($item, idx) => {
                        cy.wrap($item)
                          .find(`${itemHeader} h5`)
                          .contains(campaignArr[idx].name);
                      });
                    }

                    // Checks that the radio id belongs to the correct owner in the store
                    campaignArr.forEach((item) => {
                      expect(parseInt($radio[0].id)).to.eq(item.owner);
                    });

                  });
                });
            }
          })
        });
      })
  });
});
