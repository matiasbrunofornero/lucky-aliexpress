Cypress.Commands.add('goToPage', (page) => {
    cy.fixture('resultspage').then((resultspage) => {
        cy.get(resultspage.pagination).eq(page).click();
    });
});

Cypress.Commands.add('clickProductItem', (prod) => {
    cy.fixture('resultspage').then((resultspage) => {
        cy.get(resultspage.productItem).eq(prod)
            .invoke("removeAttr", "target")
            .click();
    });
});