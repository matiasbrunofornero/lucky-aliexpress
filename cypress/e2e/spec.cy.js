require('cypress-xpath');

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.closeModal();

    cy.searchProduct("iPhone");
    cy.goToPage(2);
    cy.clickProductItem(2);
  })
})