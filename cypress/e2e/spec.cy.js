require('cypress-xpath');

describe('template spec', () => {
  it('passes', () => {

    cy.visit('/');

    //click if visible
    cy.xpath('/html/body/div[8]/div/div[1]/img[2]').then(($btn) => {
      if ($btn.length > 0) {
        cy.xpath('/html/body/div[8]/div/div[1]/img[2]').click();
      }
    })

    cy.setSearch("asdasdasdasd");
    cy.clickSearch();

    // cy.get('[name="SearchText"]').type("iPhone");
    // cy.get('[type="submit"].search-button').click();

    var page = 2;
    var prod = 2;
    cy.get('.pagination--paginationWrapper--1eniWgI li').eq(page).click();
    cy.get('.list--gallery--34TropR > a').eq(prod).click();

  })
})