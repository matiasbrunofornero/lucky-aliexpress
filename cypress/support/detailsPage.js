Cypress.Commands.add('getProdStock', () => {
    cy.fixture('web/detailsPage').then((detailspage) => {
        cy.get(detailspage.prodStock).then(function ($elem) {
            var txt = $elem.text();
            var numb = txt.match(/\d/g);
            numb = parseInt(numb.join(""));
            return numb;
        })
    });
});