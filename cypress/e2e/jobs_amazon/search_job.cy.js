import userData from "../../fixtures/testData/userCredentials.json";
import searchPage from "../../page_objects/search.page";

describe("Jobs Search", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("homePageUrl"));
    cy.handleCookies();
    cy.clearLocalStorage();
    cy.handleErrors();
  });

  it("Search by keyword", () => {
    searchPage.keywordInputField.type(userData.role);
    searchPage.searchButton.click();
    searchPage.jobListing.should("exist");
    searchPage.jobListingTitle.should("include.text", userData.role);
  });

  it("Search by location", () => {
    searchPage.locationInputField.type(userData.city);
    searchPage.locationSuggestionList.first().click();
    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
    searchPage.searchButton.click();
    searchPage.jobListing.should("exist");
    searchPage.jobListingLocation.should("include.text", userData.city);
  });

});