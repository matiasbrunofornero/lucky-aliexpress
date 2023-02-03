require('cypress-xpath');
import { outStockMessage } from '../fixtures/data.json';
import {EN, ES, FR, IT, PT} from '../fixtures/languages.json';

describe('AliExpress Automated Testing', () => {
  it('At least one product available searching iPhone', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.closeModal();
    cy.setLanguageTo(PT);

    cy.searchProduct("iPhone");
    cy.goToPage(2);
    cy.clickProductItem(2);

    //expect available pieces is greater than 0 - needs refactor!!
    cy.get(".product-quantity-tip span > span").then(function ($elem) {
      var txt = $elem.text();
      var numb = txt.match(/\d/g);
      numb = parseInt(numb.join(""));
      expect(numb).to.be.greaterThan(585, outStockMessage);
    })
  })
})