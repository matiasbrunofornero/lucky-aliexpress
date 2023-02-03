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

  it('MOBILE - At least one product available searching iPhone', () => {
    cy.viewport(390, 844);
    cy.visit("m.aliexpress.com");
    cy.wait(5000);

    cy.get("[class='_3PDKR _3jKbq']").click()
    cy.get("[class='_3hIan'] > input").type("iPhone{enter}");

    cy.get("[class='_3TNpp'] [class='z8Oy-'] a:nth-of-type(1)").click()
    // cy.get(".sku--arrow--nNEsthW").click();

    cy.get(".product-quantity-tip span > span").then(function ($elem) {
      var txt = $elem.text();
      var numb = txt.match(/\d/g);
      numb = parseInt(numb.join(""));
      expect(numb).to.be.greaterThan(0, outStockMessage)
    })
  })
})