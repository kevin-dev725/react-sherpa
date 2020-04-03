describe('Create followup campaign', () => {
    const url = Cypress.env('clientUrl'),
          campaignId = Cypress.env('testCampaign'),
          campaignPath = `campaign/${campaignId}/details`,
          openFollowupModal = '[data-test=open-followup-modal]',
          followupModal = '[data-test=create-followup-modal]',
          createFollowupBtn = '[data-test=create-followup-btn]',
          cancelFollowupBtn = '[data-test=cancel-followup-btn]';

    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.viewport(1920, 1080);
    });

    it('navigates to the campaign details page', () => {
        cy.visit(`${url}/${campaignPath}`);
        cy.location().should(location => {
            expect(location.pathname).to.eq(`/${campaignPath}`);
        });
    });

    it('opens modal when "create follow up" button is clicked', () => {
        cy.get(openFollowupModal).click({ force: true });
        cy.get(followupModal).should('exist');
    });

    it('closes modal when cancel button is clicked', () => {
        cy.get(cancelFollowupBtn).click({ force: true });
        cy.get(followupModal).should('not.exist');
    });

    // it('closes modal when user clicks outside of it', () => {
    //     cy.get(openFollowupModal).click({ force: true });
    //     cy.get('.modal').click({ force: true });
    //     cy.get(followupModal).should('not.exist');
    // });

    it('make a successful API call when clicking the "continue" button and navigates to the follow up campaign\'s details page', () => {
        cy.server();
        cy.route({ url: `**/campaigns/${campaignId}/followup/**`, method: 'POST' }).as('create-follow-up');
        cy.get(openFollowupModal).click({ force: true });
        cy.get(createFollowupBtn).click({ force: true });
        cy.wait('@create-follow-up').then(xhr => {
            expect(xhr.status).to.eq(201);
            cy.location().should(location => {
                expect(location.pathname).to.eq(`/campaign/${xhr.response.body.id}/details`);
            });
        });
    });

    it('displays an error toast on network failure and does not change to new followup details page', () => {
        cy.login();
        cy.visit(`${url}/${campaignPath}`)
        cy.server();
        cy.route({ url: `**/campaigns/${campaignId}/followup/**`, response: [], status: 405, method: 'POST' }).as('create-follow-up-fail');
        cy.get(openFollowupModal).click({ force: true });
        cy.get(createFollowupBtn).click({ force: true });
        cy.wait('@create-follow-up-fail').then(xhr => {
            expect(xhr.status).to.eq(405);
            cy.location().should(location => {
                expect(location.pathname).to.eq(`/${campaignPath}`);
            });
            cy.checkForNewToast('alert')
    });
});
});
