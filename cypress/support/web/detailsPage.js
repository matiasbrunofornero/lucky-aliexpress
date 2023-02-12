Cypress.Commands.add('getProdStock', () => {
    cy.fixture('web/detailsPage').then((detailspage) => {
        cy.xpath('/html/body').then(($ele) => {
            if ($ele.find(detailspage.prodStock).length > 0) {
                cy.get(detailspage.prodStock).then(function ($elem) {
                    var txt = $elem.text();
                    var numb = txt.match(/\d/g);
                    numb = parseInt(numb.join(""));
                    return numb;
                });
            }
            else {
                cy.get(detailspage.mProdStock).then(function ($elem) {
                    var txt = $elem.text();
                    var numb = txt.match(/\d/g);
                    numb = parseInt(numb.join(""));
                    return numb;
                });
            }
        })
    });
});