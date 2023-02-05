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

    /*
    Making use of Custom Commands in Cypress.
    Typically you will create a custom JS function 
    to abstract some functionality to re-use within 
    your application, i.e., utility functions. 
    Cypress commands are the same thing. 
    They allow you to re-using across multiple tests.
    To make the test responsive, I made sure that in the
    beforeEach hook, user could able to select if want
    to do the testing in web or mobile version.
    Each version has its corresponding elements and locators.
    */
    cy.closeModal();

    /*
    closeModal() custom command was built in order to
    close the discount modal that sometimes is displayed
    as a fixed element making it impossible for us to 
    click another element having to close it before continue 
    */

    cy.setLanguageTo(IT);

    /*
    setLanguage() custom command was built in order to
    test the if the language change is working ok.
    Different languages are written in '../fixtures/languages.json';
    with the possibility to add/update or delete the existing languages.
    */

    cy.searchProduct("iPhone");
    cy.clickProductItem(2);

    /*
    searchProduct() and getProductItem() were built in order to
    search an specific product sent by parameter,
    through a basic search functionality. We have in issue there,
    due I was not able to found the "ad products". 
    Only on special occasions we could see the "ad" tag in some
    products, but never doing the "iPhone" search.
    ad locator => .manhattan--ad--1dNA0BV
    */

    cy.goToPage(2);

    /*
    goToPage() was built in order to browse in the Results Page
    and select the number of page passed by parameter to select
    an specific product in a specific page.
    */

    cy.getProdStock().then((stock) => {
      expect(stock).to.be.greaterThan(0, outStockMessage);
    })

    /*
    and by last, the final assertion. 
    getProdStock() get the "X Pieces available" text in the
    product details page in order to do an assertion:
    If the stock is greater than 0, the test works ok.
    Otherwise, if the stock is 0, Cypress will show us an 
    error message: Green color means the stock is greater than 0. 
    Red color means the product is out of stock at the moment
    */
  })

  it('...Cypress is able to do a complete REST API testing using jsonplaceholder.typicode.com fake API', () => {
    /*
    otherwise, I did use of a fake API in jsonplaceholder.typicode.com 
    to test the CRUD operators through Cypress.
    Here I am doing a GET in jsonplaceholder.typicode.com/users/1
    which returns a json with this information:
    {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
    }
    }

    after that, I am verifiying if the response contains values as
    name, email or city passed by parameter in '../fixtures/api/data.json';
    */

    cy.request('GET', apiData.apiUrl + '/users/1').then((response) => {
      expect(response).to.have.property('status', 200);
      expect(JSON.stringify(response.body.name)).to.contain(apiData.getUserName);
      expect(JSON.stringify(response.body.email)).to.contain(apiData.getUserEmail);
      expect(JSON.stringify(response.body.address.city)).to.contain(apiData.getUserCity);
    });

    /*
    after the GET I did a POST with this json data
    {
    "userId": 989,
    "id": 277,
    "title": "LuckyApp Sample API Automation",
    "body": "This is just an example to test if Cypress is able to do a POST request"
    }

    and the assertion were in status is equal to 201,
    if the status text is equals to CREATED, 
    and by last, if the created post includes the body
    "This is just an example to test if Cypress is able to do a POST request"
    */

    cy.request('POST', apiData.apiUrl + '/posts', postCreationData).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('201');
      expect(JSON.stringify(response.statusText)).to.contain('Created');
      expect(JSON.stringify(response.body)).to.contain('101');
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.postLuckyBody);
    });

    /*
    after the POST I did a PUT with this json data in order to edit an existing post
    {
    "userId": 500,
    "id": 500,
    "title": "Testing PUT Request - Cypress",
    "body": "It was edited through PUT Cypress Request on day 2/4"
    }

    and the assertion were in status is equal to 200,
    if the status text is equals to OK, 
    and by last, if the responseBody is not equals to empty,
    thing that will be used in the next DELETE
    */

    cy.request('PUT', apiData.apiUrl + '/posts/1', postUpdateData).then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.updateLuckyTitle);
      expect(JSON.stringify(response.requestBody)).to.contain(apiData.updateLuckyBody);
      expect(JSON.stringify(response.body)).to.not.equal('{}');
    });

    /*
    by last, did a DELETE in the post/1 and the verification was if the response.body
    (not empty in the PUT response) is completely empty now, doing the post as deleted
    */

    cy.request('DELETE', apiData.apiUrl + '/posts/1').then((response) => {
      expect(JSON.stringify(response.status)).to.equal('200');
      expect(JSON.stringify(response.statusText)).to.contain('OK');
      expect(JSON.stringify(response.body)).to.equal('{}');
    });
  });
});