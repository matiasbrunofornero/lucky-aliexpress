Cypress.Commands.add('searchProduct', (search) => {
    cy.fixture('homepage').then((homepage) => {
        cy.get(homepage.searchInput).type(search);
        cy.get(homepage.searchBtn).click();
    });
});