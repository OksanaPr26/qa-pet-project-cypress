class ApplicationPage{
    get firstNameInput() {return cy.get('#applicant_first_name')};
    get lastNameInput() {return cy.get('#applicant_last_name')};
    get phoneNumberInput() {return  cy.get('#applicant_primary_phone_number')};
    get addressStreetInput() {return cy.get('#applicant_address_street_line1')};
    get addressCityInput() {return cy.get('#applicant_address_city')};
    get addressZipCodeInput() {return  cy.get('#applicant_address_zip').type('12345')};
    get countryDropBox() {return  cy.get('span[role="combobox"]')};
    get countryOptionsList() {return  cy.get('.select2-results__option')};
    get stateDropBox() {return cy.get('[class="select2-selection__placeholder"]')};
    get stateOptionsList() {return  cy.get('.select2-results__option')};
    get saveAndContinueButton() {return cy.get('button[data-direct-call-identifier="contact_details"]:visible')};
    get skipAndContinueButton() {return cy.get('#save-and-continue-form-button')};
    get relocationOptionNo() {return cy.get('#ARE_YOU_WILLING_TO_RELOCATE-option-1-label')};
    get howDidYouHearAboutRoleDropBox() { return cy.get('.select2-selection__arrow')};
    get advertisementOption() { return cy.get('.select2-results__option[id^="select2-"][id$="-ADVERTISEMENT"]')};
    get ifAdvertisementSelectOption() { return cy.get('div[data-questionid="HOW_DID_YOU_HEAR_ABOUT_THIS_ROLE_ADVERTISEMENT"] select')};
    get continueButton() {return cy.get('button.btn.btn-primary').contains('Continue')};

    selectHighestDegree() {
        cy.contains('Select an option').click();
        cy.get('li.select2-results__option')
           .contains('High school or equivalent')
           .click().wait(1000);
        cy.get('span[aria-label="School name"]').scrollIntoView();
      }
    
    selectSchoolByTyping(schoolName) {
        cy.get('span[aria-label="School name"]').click({ force: true });
        cy.get('span.select2-container--open', { timeout: 10000 }).should('exist');
        cy.get('input.select2-search__field', { timeout: 10000 })
           .should('be.visible')
           .first()
           .type('High', { delay: 100, force: true });
        cy.get('li.select2-results__option', { timeout: 10000 })
           .should('be.visible')
           .first()
           .click({ force: true });
      }
}
export default new ApplicationPage();