Cypress.Commands.add('closeModal', () => {
    cy.fixture('common').then((common) => {
        cy.xpath('/html/body').then(($ele) => {
            if ($ele.find(common.discountModal).length > 0) {
                cy.get(common.discountModalCloseBtn).click();
                cy.wait(5000);
            }
        })
    });
});

Cypress.Commands.add('setLanguageTo', (lang) => {
    cy.fixture('common').then((common) => {
        cy.get('#switcher-info').then(($button) => {
            cy.wrap($button).click();
            cy.get(common.languageInput).click();
            cy.get(common.languageSearch).type(lang);
            cy.get(common.languageResult).click();
        })

        cy.get(common.saveBtn).then(($button) => {
            cy.wrap($button).click();
            cy.wait(5000);
        })

        cy.closeModal();
    });
});