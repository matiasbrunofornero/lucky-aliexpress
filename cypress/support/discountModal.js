Cypress.Commands.add('closeModal', () => {
    cy.fixture('discountmodal').then((discountmodal) => {
        cy.xpath(discountmodal.closeBtn).then(($btn) => {
            if ($btn.length > 0) {
                cy.xpath(discountmodal.closeBtn).click();
            }
        })
    });
});