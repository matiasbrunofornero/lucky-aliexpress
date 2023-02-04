Cypress.Commands.add('goToPage', (page) => {
    cy.fixture('resultspage').then((resultspage) => {
        cy.url().then(($url) => {
            if ($url.includes("m.")) {
                return;
            }
            cy.get(resultspage.pagination).eq(page).click();
        })
    });
});

Cypress.Commands.add('clickProductItem', (prod) => {
    cy.fixture('resultspage').then((resultspage) => {
        cy.url().then(($url) => {
            if ($url.includes("m.")) {
                cy.get(resultspage.mProductItem).click();
            }
            else {
                cy.get(resultspage.productItem).eq(prod)
                    .invoke("removeAttr", "target")
                    .click();
            }
        })
    });
});