class SearchPage {
    get searchButton() {return cy.get('#search-button')};
    get jobListing() {return cy.get('.job[data-job-id]')};
    get keywordInputField() {return cy.get("input#search_typeahead").eq(1)};
    get jobListingTitle() {return cy.get('.job .job-link')};
    get locationInputField() {return  cy.get('[id="location-typeahead"]').eq(1)};
    get locationSuggestionList() {return cy.get('.tt-suggestion.tt-selectable')};
    get jobListingLocation() {return  cy.get('.job .text-nowrap')};
    get applyNowButton() {return cy.get("#apply-button")};
}
export default new SearchPage();