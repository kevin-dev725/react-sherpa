describe('Phone Number Page', () => {
  const clientUrl = Cypress.env('clientUrl');

  it('initial load of phone numbers and dont reload numbers again', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.server();
    cy.route({ url: '**/phone-numbers/**' }).as('numbers');
    cy.visit(`${clientUrl}/phone-manager`);

    cy
      .get('[data-test=spinner]')
      .should('exist');

    cy.wait('@numbers');

    cy
      .getState()
      .then(store => {
        const { numberManagerStore: { numbers } } = store;

        expect(Object.keys(numbers)).to.have.length.of.at.least(1);

        cy.visit(`${clientUrl}/campaigns`);
        cy.wait(2000);
        cy.visit(`${clientUrl}/phone-manager`);
        cy
          .get('[data-test=spinner]')
          .should('not.exist');
      });
  });

  it('releases a number successfully', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.server();
    cy.route({ url: '**/phone-numbers/**' }).as('numbers');
    cy.route({ method: 'POST', url: '**/phone-numbers/*/release/**' }).as('release');
    cy.visit(`${clientUrl}/phone-manager`);

    cy.wait('@numbers');

    cy
      .getState()
      .then(store => {
        const { numberManagerStore: { numbers } } = store;

        const goodNumbers = Object.entries(numbers).filter(([_, { status }]) => status === 'active');
        const [_, { id }] = goodNumbers[0];

        cy
          .get(`[data-test=kebab-${id}]`)
          .click()

        cy
          .get('[data-test=Release]')
          .click()

        cy.checkForNewToast('alert-success');

        cy.wait('@release');

        cy
          .getState()
          .then(storeV2 => {
            const releasedNumber = storeV2.numberManagerStore.numbers[id];

            expect(releasedNumber.status).to.eq('released');
          });
      })
  });

  it('cannot click kebab for released number', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.server();
    cy.route({ url: '**/phone-numbers/**' }).as('numbers');
    cy.visit(`${clientUrl}/phone-manager`);

    cy.wait('@numbers');

    cy
      .getState()
      .then(store => {
        const { numberManagerStore: { numbers } } = store;

        const goodNumbers = Object.entries(numbers).filter(([_, { status }]) => status === 'released');
        const [_, { id }] = goodNumbers[0];

        cy
          .get(`[data-test=kebab-${id}]`)
          .should('have.attr', 'disabled')
      });
  });
});
