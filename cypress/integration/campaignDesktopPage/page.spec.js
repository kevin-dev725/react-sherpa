// import { uiGetCampaigns } from '../../../src/store/uiStore/campaignsPageDesktopView/campaignsList/filterData/selectors';

describe('Campaign Desktop Page', () => {
  const url = Cypress.env('clientUrl');
  const campaignPath = `${url}/campaigns/`

  it('loads campaigns desktop page and has the active tab selected ', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.visit(campaignPath);
    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .next()
      .should('have.class', 'active');
  });

  it('loads campaigns list', () => {
    cy.viewport(950, 800);
    cy
      .getState()
      .then(store => {
        const {
          uiStore: {
            campaignsPageDesktopView: {
              campaignsList: { filterData: { tabs: { active } } }
            } } } = store;

        cy
          .get('#virtualizedList')
          .children()
          .first()
          .children()
          .should('have.length', active.sortOrder.length);
      });
  });

  // test export capability
  it('exports campaign', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/*/export/**' }).as('export');

    cy
      .getState()
      .then(data => {
        const {
          uiStore: {
            campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { active } } } }
          }
        } = data;

        cy
          .get(`[data-test=kebab-${active.sortOrder[0]}]`)
          .click();
        cy
          .get('[data-test=Export]')
          .click()

        cy
          .wait('@export')
          .then(xhr => {
            expect(xhr.status).to.eq(200);
            cy.checkForNewToast('alert-success');
          });
      });
  });

  // chains off the previous one
  it('shows loading spinner when switching to new tab', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .first()
      .click()

    cy.wait('@campaigns')

    cy
      .getState()
      .then(store => {
        const { uiStore: { campaignsPageDesktopView: { campaignsList: { filterData: { tabs } } } } } = store;
        assert.isAbove(tabs.all.sortOrder.length, 0);
      })
  });

  it('switches sorting options and checks if success call', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');

    cy
      .getState()
      .then(state => {
        const { uiStore: { campaignsPageDesktopView: { campaignsList: { filterData: { tabs } } } } } = state;
        cy
          .get('[data-test=filter-campaigns-select]')
          .select('Oldest')

        cy
          .wait('@campaigns')
          .then(response => {
            assert.equal(response.status, 200);
          });

        cy
          .getState()
          .then(nextState => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { all } } } }
              }
            } = nextState;

            assert.notEqual(all.sortedBy, tabs.all.sortedBy);
          });
      });
  });

  it('Archives a campaign', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'PUT', url: '**/campaigns/*/**' }).as('campaigns');
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns2');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .next()
      .first()
      .click();

    cy.wait('@campaigns2');

    cy
      .getState()
      .then(data => {
        const {
          uiStore: {
            campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { active } } } }
          }
        } = data;

        cy
          .get(`[data-test=kebab-${active.sortOrder[0]}]`)
          .click();
        cy
          .get('[data-test=Archive]')
          .click()

        cy.wait('@campaigns');

        cy
          .getState()
          .then(data2 => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { active: active2 } } } }
              }
            } = data2;

            assert.equal(active.sortOrder.length, active2.sortOrder.length + 1);
          })
      });
  })

  it('UnArchives a Campaigns', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'PUT', url: '**/campaigns/*/**' }).as('campaigns');
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns2');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .last()
      .click();

    cy.wait('@campaigns2');

    cy
      .getState()
      .then(data => {
        const {
          uiStore: {
            campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { archived } } } }
          }
        } = data;

        cy
          .get(`[data-test=kebab-${archived.sortOrder[0]}]`)
          .click();
        cy
          .get('[data-test=Un-Archive]')
          .click()

        cy.wait('@campaigns');

        cy
          .getState()
          .then(data2 => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { archived: archived2 } } } }
              }
            } = data2;

            assert.equal(archived.sortOrder.length, archived2.sortOrder.length + 1);
          })
      });
  });

  it('Creates a new campaign', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'POST', url: '**/campaigns/**' }).as('campaigns-create');
    cy
      .get('[data-test="desktop-new-campaign-button"]')
      .click();

    // fill in the form
    cy
      .get('[data-test=campaign-form]')
      .within(() => {
        cy.get('[name=name]').type('test-campaign');
        cy.get('[for=market]')
          .parent()
          .click();
        cy.get('[id=react-select-2-option-0]').click();
        cy.get('[data-test=campaign-form-submit]').click();

        cy.wait('@campaigns-create')
          .then(xhr => {
            expect(xhr.status).to.eq(201)
          });
      });
  });

  it('Fails validation when creating a new campaing', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.visit(campaignPath);
    cy.server();
    cy.route({ method: 'POST', url: '**/campaigns/**' }).as('campaigns-create');
    cy
      .get('[data-test="desktop-new-campaign-button"]')
      .click();

    // fill in the form
    cy
      .get('[data-test=campaign-form]')
      .within(() => {
        cy.get('[name=name]').type('test-campaign');

	cy.get('[data-test=campaign-form-submit]').click();
	cy.get('[data-test=campaign-form-market-error]').should('exist')
      });
  });
});
