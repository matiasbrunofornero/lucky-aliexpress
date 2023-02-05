require('cypress-xpath');
import { outStockMessage } from '../fixtures/web/data.json';
import { EN, ES, FR, IT, PT } from '../fixtures/languages.json';
import apiData from '../fixtures/api/data.json';
import postCreationData from '../fixtures/api/post-creation.json';
import postUpdateData from '../fixtures/api/post-update.json';



describe('As a Customer we want to see if...', () => {
  beforeEach((mobile = false) => {
    cy.goToUrl(mobile);
  })

  it('...the second ad from the second results page when searching for "Iphone" has at least 1 item to be bought.', () => {
    cy.closeModal();
    cy.setLanguageTo(IT);

    cy.searchProduct("iPhone");
    //where are ad products?!
    //ad locator .manhattan--ad--1dNA0BV

    cy.goToPage(2);
    cy.clickProductItem(2);

    cy.getProdStock().then((stock) => {
      expect(stock).to.be.greaterThan(0, outStockMessage);
    })
  })

  it('...Cypress is able to do a complete REST API testing using jsonplaceholder.typicode.com fake API', () => {
    cy.request('GET', apiData.apiUrl + '/users/1').then((response) => {
      expect(response).to.have.property('status', 200);
      expect(JSON.stringify(response.body.name)).to.contain(apiData.getUserName);
      expect(JSON.stringify(response.body.email)).to.contain(apiData.getUserEmail);
      expect(JSON.stringify(response.body.address.city)).to.contain(apiData.getUserCity);
    });

    cy.request('POST', apiData.apiUrl + '/posts', postCreationData).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('201');
      expect(JSON.stringify(response.statusText)).to.contain('Created');
      expect(JSON.stringify(response.body)).to.contain('101');
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.postLuckyBody);
    });

    cy.request('PUT', apiData.apiUrl + '/posts/1', postUpdateData).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.updateLuckyTitle);
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.updateLuckyBody);
      expect(JSON.stringify(response.body)).to.not.equal('{}');
    });

    cy.request('DELETE', apiData.apiUrl + '/posts/1').then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.body)).to.equal('{}');
    });
  });
});