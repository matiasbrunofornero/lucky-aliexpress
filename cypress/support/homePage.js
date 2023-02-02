Cypress.Commands.add('setSearch', (search) => {
    cy.fixture('homepage').then((homepage) => {
        cy.get(homepage.searchInput).type(search);
    });
});

Cypress.Commands.add('clickSearch', (search) => {
    cy.fixture('homepage').then((homepage) => {
        cy.get(homepage.searchBtn).click();
    });
});