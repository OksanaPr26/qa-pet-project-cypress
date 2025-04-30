import { faker } from "@faker-js/faker";
import userData from "../../fixtures/testData/userCredentials.json";
import authenticationPage from "../../page_objects/login.page";
import verificationText from "../../fixtures/testData/verificationText.json";
import accountPage from "../../page_objects/account.page";
import searchPage from "../../page_objects/search.page";
import applicationPage from "../../page_objects/application.page";

const timestamp = Date.now();
const email = `oksana${timestamp}@${Cypress.env("domain")}`;
const password = faker.internet.password(12) + "1!";

describe("Should Apply for Job", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.handleCookies();
    cy.clearLocalStorage();
    cy.handleErrors();
  });

  it("Apply for a job", () => {
    authenticationPage.registerUser(email, password,);
    authenticationPage.verificationMessage.should(
      "include.text",
      verificationText.verificationSuccessful
    );
    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 });
    accountPage.goToMyApplicationsButton.click();

    cy.visit(Cypress.env("accountPageUrl"));
    accountPage.emailInput.type(userData.email);
    accountPage.continueButton.should("be.visible").click();
    accountPage.searchJobsButton.click();

    cy.visit(Cypress.env("homePageUrl"));
    searchPage.keywordInputField.type(userData.role);
    searchPage.searchButton.click();
    searchPage.jobListing.should("exist");
    searchPage.jobListingTitle.should("include.text", userData.role);
    searchPage.jobListing.eq(1).find("a.read-more").click();
    searchPage.applyNowButton.click();

    applicationPage.firstNameInput.type(userData.firstName);
    applicationPage.lastNameInput.type(userData.lastName);
    applicationPage.phoneNumberInput.type(userData.phoneNumber);
    applicationPage.addressStreetInput.type(userData.street);
    applicationPage.addressCityInput.type(userData.city);
    applicationPage.addressZipCodeInput.type(userData.zipCode);
    applicationPage.countryDropBox.first().click();
    applicationPage.countryOptionsList.contains(userData.country).click();
    applicationPage.stateDropBox.click();
    applicationPage.stateOptionsList.contains(userData.state).scrollIntoView().click();
    applicationPage.saveAndContinueButton.click().wait(1000);

    applicationPage.skipAndContinueButton.click();

    applicationPage.relocationOptionNo.click();
    applicationPage.howDidYouHearAboutRoleDropBox.first().click();
    applicationPage.advertisementOption.click();
    applicationPage.ifAdvertisementSelectOption.select("INTERNET", {force: true});
    applicationPage.continueButton.click().wait(2000);

    applicationPage.selectHighestDegree();
    applicationPage.selectSchoolByTyping('High');
    applicationPage.continueButton.click();

    cy.answerYesToQuestion('quality assurance engineering experience');
    cy.wait(300);
    cy.answerYesToQuestion('computer science or equivalent');
    cy.wait(300);
    cy.answerYesToQuestion('manual testing');
    cy.wait(300);
    cy.answerYesToQuestion('troubleshooting code');
    cy.wait(300);
    cy.answerYesToQuestion('UI and API automation testing');
    cy.wait(300);
    cy.answerYesToQuestion('API & Mobile testing');
    cy.wait(300);
    cy.answerYesToQuestion('designing and planning test conditions');
    cy.wait(300);
  
    applicationPage.continueButton.click();
  });
  
});