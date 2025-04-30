import { registerCommand } from 'cypress-wait-for-stable-dom'
registerCommand()

Cypress.Commands.add("handleErrors", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

Cypress.Commands.add("handleCookies", () => {
    cy.get("button").then(($buttons) => {
      if ($buttons.length > 0) {
        const acceptButton = $buttons.filter((_, el) =>
          el.innerText.includes("Accept all")
        );
        if (acceptButton.length) {
          cy.wrap(acceptButton).should("be.visible").click();
          cy.log("Cookies accepted");
        }
      }
    });
  });
  Cypress.Commands.add('answerYesToQuestion', (partialText) => {
    cy.contains(partialText, { matchCase: false })
      .scrollIntoView()
      .parents('.question')
      .as('questionBlock');
  
    cy.get('@questionBlock')
      .find('.select2-selection')
      .click({ force: true });
  
    cy.get('li.select2-results__option')
      .contains(/^Yes$/)
      .should('be.visible')
      .click({ force: true });
  
    cy.get('body').click(0, 0);
  
    cy.wait(500);
  });
  
  
  
  