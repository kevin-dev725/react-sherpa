describe('Prospect page', () => {
  const prospectSearchInput = '[data-test=prospect-search-input]',
    swipeableListItem = '[data-test=swipeable-list-item]',
    search = '303',
    url = Cypress.env('clientUrl');

  before(() => {
    cy.login();
    cy.visit(`${url}/prospects`);
  });

  it('displays the correct page header', () => {
    cy.get('h1').contains('Prospect Search');
  });

  it('has search module input field', () => {
    cy.get(prospectSearchInput)
      .find('input')
      .should('exist');
  });

  it('accepts inputs', () => {
    cy.get(prospectSearchInput)
      .find('input')
      .type(search)
      .should('have.value', search);
  });

  it('contains button', () => {
    cy.get(prospectSearchInput)
      .find('button')
      .should('exist');
  });

  // it('virtualized list has proper height ', () => {
  //   cy.window()
  //     .then(window => {
  //       cy.get('#virtualizedList')
  //         .should($vl => {
  //           const listOffsetTop = window.document.getElementById("virtualizedList").offsetTop;
  //           const expectedHeight = window.innerHeight - listOffsetTop;
  //           expect($vl).to.have.css('height', `${expectedHeight}px`);
  //         });
  //     });
  // });

  it('performs a prospect search and displays the results', () => {
    cy.server();
    const options = {
      url: 'prospects/**',
      response: 'prospects',
      status: 200,
      method: 'GET'
    };
    cy.stubResponse(options).then(res => {
      cy.get(prospectSearchInput)
        .find('button')
        .click();
      cy.wait(`@${res.alias}`);
    });

    cy.get(swipeableListItem).should($item => {
      expect($item).to.have.length.of.at.least(1);
    });
  });

  it('performs a second prospect search and displays the results', () => {
    cy.server();
    cy.get(prospectSearchInput)
      .find('input')
      .clear()
      .type(search);

    const options = {
      url: 'prospects/**',
      response: 'prospects',
      status: 200,
      method: 'GET'
    };

    cy.stubResponse(options).then(res => {
      cy.get(prospectSearchInput)
        .find('button')
        .click();
      cy.wait(`@${res.alias}`);
    });

    cy.get(swipeableListItem).should($item => {
      expect($item).to.have.length.of.at.least(1);
    });
  });

  it('displays correct information for each prospect', () => {
    cy.fixture('prospects').then(prospects => {
      cy.get(swipeableListItem).each(($item, index) => {
        cy.wrap($item).then(item => {
          const {
            name,
            phoneDisplay,
            propertyAddress,
            propertyCity,
            propertyState,
            propertyZip
          } = prospects.results[index];
          expect(item).to.contain(name);
          expect(item).to.contain(phoneDisplay);
          expect(item).to.contain(propertyAddress);
          expect(item).to.contain(propertyCity);
          expect(item).to.contain(propertyState);
          expect(item).to.contain(propertyZip);
        });
        cy.wrap($item)
          .find('h4')
          .should('exist');
      });
    });
  });
});
