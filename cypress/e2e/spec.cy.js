require('cypress-xpath');
import { outStockMessage } from '../fixtures/data.json';
import { EN, ES, FR, IT, PT } from '../fixtures/languages.json';
import { apiUrl } from '../fixtures/api.json';

describe('As a Customer we want to see if...', () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.visit("m.aliexpress.com");
    // cy.reloadIfPromote();
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

  it('...Cypress is able to do a complete REST API testing using dummy.restapiexample.com.', () => {
    cy.request('GET', apiUrl + '/users/1').then((response) => {
      expect(response).to.have.property('status', 200);
      expect(JSON.stringify(response.body.name)).to.contain("Leanne Graham");
      expect(JSON.stringify(response.body.email)).to.contain("Sincere@april.biz");
      expect(JSON.stringify(response.body.address.city)).to.contain("Gwenborough");
    });

    const createdPost = JSON.stringify({
      "userId": 989,
      "id": 277,
      "title": 'LuckyApp Sample API Automation',
      "body": 'This is just an example to test if Cypress is able to do a POST request',
    });

    cy.request('POST', apiUrl + '/posts', createdPost).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('201');
      expect(JSON.stringify(response.statusText)).to.contain('Created');
      expect(JSON.stringify(response.body)).to.contain('101');
      expect(JSON.stringify(response.requestBody)).to.contain("LuckyApp Sample API Automation");
    });

    const updatedPost = JSON.stringify({
      "userId": 500,
      "id": 500,
      "title": 'Testing PUT Request - Cypress',
      "body": 'It was edited through PUT Cypress Request on day 2/4',
    });

    cy.request('PUT', apiUrl + '/posts/1', updatedPost).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.requestBody)).to.contain('Testing PUT Request - Cypress');
      expect(JSON.stringify(response.requestBody)).to.contain('It was edited through PUT Cypress Request on day 2/4');
      expect(JSON.stringify(response.body)).to.not.equal('{}');
    });

    cy.request('DELETE', apiUrl + '/posts/1').then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.body)).to.equal('{}');
    });
  });
});