require('cypress-xpath');
import { outStockMessage } from '../fixtures/data.json';
import { EN, ES, FR, IT, PT } from '../fixtures/languages.json';

describe('AliExpress Automated Testing', () => {
  it('At least one product available searching iPhone', () => {

    cy.visit('/');
    cy.wait(5000);

    cy.closeModal();
    cy.setLanguageTo(PT);

    cy.searchProduct("iPhone");
    cy.goToPage(2);

    cy.clickProductItem(2);

    cy.getProdStock().then((stock) => {
      expect(stock).to.be.greaterThan(0, outStockMessage)
    })
  })
})