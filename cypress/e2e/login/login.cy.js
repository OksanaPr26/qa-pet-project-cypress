import userData from "../../fixtures/testData/userCredentials.json";
import loginPage from "../../page_objects/login.page";
import accountPage from "../../page_objects/account.page";
import verificationText from "../../fixtures/testData/verificationText.json";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.handleCookies();
    cy.clearLocalStorage();
    cy.handleErrors();
  });

  it("Login to existing account", () => {
    loginPage.emailInput.type(userData.email, { delay: 100 });
    loginPage.passwordInput.type(userData.password, { delay: 100 });
    loginPage.submitButton.click();
    
    cy. wait(5000);

    cy.task("getMailosaurOTP", userData.email, { timeout: 30000 }).then((otpCode) => {
      expect(otpCode).to.not.be.null;

    loginPage.verificationCodeInput.type(otpCode);
    loginPage.submitButton.click();

    loginPage.verificationMessage.should("include.text", verificationText.verificationSuccessful);

    cy.url().should("include", "/accountInfo");
    accountPage.accountInformationHeader.should("have.text", "My Amazon.jobs account");
    accountPage.accountInformationUserEmail.should("include.text",userData.email);
    });
  });

  it("Sgould Logout", () => {
    loginPage.emailInput.type(userData.email, { delay: 100 });
    loginPage.passwordInput.type(userData.password, { delay: 100 });
    loginPage.submitButton.click();
    
    cy. wait(5000);

    cy.task("getMailosaurOTP", userData.email, { timeout: 30000 }).then((otpCode) => {
      expect(otpCode).to.not.be.null;

    loginPage.verificationCodeInput.type(otpCode);
    loginPage.submitButton.click();

    loginPage.verificationMessage.should("include.text", verificationText.verificationSuccessful);

    loginPage.logoutButton.click();

    cy.url().should("include", "/en");
    loginPage.homePageHeader.should('have.text', 'Find jobs');

    });
  });

});