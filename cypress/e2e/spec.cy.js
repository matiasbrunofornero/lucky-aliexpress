require('cypress-xpath');
import { outStockMessage } from '../fixtures/data.json';
import { EN, ES, FR, IT, PT } from '../fixtures/languages.json';

describe('As a Customer we want to see if...', () => {
  beforeEach(() => {
    // cy.visit("/");
    cy.visit("m.aliexpress.com");
    cy.reloadIfPromote();
  })

  it('...the second ad from the second results page when searching for "Iphone" has at least 1 item to be bought.', () => {
    cy.closeModal();
    cy.setLanguageTo(EN);
    //english not working properly!!

    cy.searchProduct("iPhone");
    //where are ad products?!
    //ad locator .manhattan--ad--1dNA0BV
    
    cy.goToPage(2);
    cy.clickProductItem(2);

    cy.getProdStock().then((stock) => {
      expect(stock).to.be.greaterThan(0, outStockMessage);
    })
  })
})