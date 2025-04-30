import { faker } from "@faker-js/faker";
import loginPage from "../../page_objects/login.page";
import accountPage from "../../page_objects/account.page";
import verificationText from "../../fixtures/testData/verificationText.json"

const timestamp = Date.now();
const email = `oksana${timestamp}@${Cypress.env("domain")}`;
const password = faker.internet.password(12) + "1!";

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/createaccount");
    cy.handleCookies();
    cy.clearLocalStorage();
    cy.handleErrors();
  });

  it("Register with valid credentials", () => { 
    loginPage.emailInput.type(email, { delay: 100 });
    loginPage.passwordInput.type(password, { delay: 100 });
    loginPage.confirmPasswordInput.type(password, { delay: 100 });
    loginPage.submitButton.click();
    
    cy.task("getMailosaurOTP", email, { timeout: 30000 }).then((otpCode) => {
      expect(otpCode).to.not.be.null;

    loginPage.verificationCodeInput.should("be.visible").should("be.enabled").type(otpCode);
    loginPage.submitButton.click();

    loginPage.verificationMessage.should("include.text", verificationText.verificationSuccessful)

    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 })

    cy.url().should("include", "/accountInfo");
    accountPage.accountInformationHeader.should("have.text", "My Amazon.jobs account");
    accountPage.accountInformationUserEmail.should("include.text", email.toLowerCase());
    });
  });
  
});