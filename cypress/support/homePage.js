Cypress.Commands.add('searchProduct', (search) => {
    cy.fixture('web/homepage').then((homepage) => {
        cy.url().then(($url) => {
            if ($url.includes("m.")) {
                cy.get(homepage.mSearchBox).click()
                cy.get(homepage.mSearchInput).type("iPhone{enter}");
            }
            else {
                cy.get(homepage.searchInput).type(search);
                cy.get(homepage.searchBtn).click();
            }
        });
    });
});