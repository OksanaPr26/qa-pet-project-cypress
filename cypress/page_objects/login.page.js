class LoginPage {
    get emailInput() {return cy.get('input[name="username"]')};
    get passwordInput() {return cy.get('input[name="password"]')};
    get confirmPasswordInput() {return cy.get('input[name="confirmPassword"]')};
    get submitButton() {return cy.get('button[type="submit"].btn-main')};
    get verificationCodeInput() {return cy.get("#verificationFormCodeInputField")};
    get verificationMessage() {return cy.get("div")};
    get createAccauntHeader() {return cy.get('h2.header-login.top-header#pageHeader')}; 
    get homePageHeader(){return cy.get('h1.find-jobs')};
    get logoutButton(){return cy.get('#logOutLink')};

    userLogin(email, password) {
      this.emailInput.type(email, { delay: 100 });
      this.passwordInput.type(password, { delay: 100 });
      this.submitButton.click();
  
      cy.task("getMailosaurOTP", email, { timeout: 30000 }).then((otpCode) => {
        expect(otpCode).to.not.be.null;
        this.verificationCodeInput.type(otpCode);
        this.submitButton.click();
      });
    }
    registerUser(email, password) {
      cy.visit("/createaccount");
        this.emailInput.type(email, { delay: 100 });
        this.passwordInput.type(password, { delay: 100 });
        this.confirmPasswordInput.type(password, { delay: 100 });
        this.submitButton.click();

      cy.task("getMailosaurOTP", email, { timeout: 30000 }).then((otpCode) => {
        expect(otpCode).to.not.be.null;
        this.verificationCodeInput.should("be.visible").should("be.enabled").type(otpCode);
        this.submitButton.click();
      });
    }
}
export default new LoginPage();