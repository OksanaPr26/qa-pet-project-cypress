class AccountPage{
    get emailInput() {return cy.get('input[name="email"]')};
    get continueButton() {return cy.get('#sign-in-button')};
    get profileButton() {return cy.get('a.nav-link[data-exit="true"][href="/user/details"]')};
    get logoutButton() {return cy.get('a.dropdown-item[href="/logout"]')};
    get accountInformationHeader() { return cy.get("h2.header-login.top-header")};
    get accountInformationUserEmail() { return cy.get('div.col-sm-12.item p')};
    get goToMyApplicationsButton() {return cy.get('#backToA2D1Link')}; 
    get myCareerDropDown() {return cy.get('a.dropdown-toggle.enriched-profile[href="#"]').contains("My career")};
    get myProfileButton() {return cy.get('a.dropdown-item[href="/user/details"]').contains("My profile")}; 
    get searchJobsButton() {return cy.get('a.btn.btn-primary').should('have.attr', 'href', 'https://www.amazon.jobs')};
  }
  export default new AccountPage();