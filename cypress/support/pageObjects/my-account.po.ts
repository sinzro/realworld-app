/// <reference types="cypress" />
import { BasePage } from "./base.po";

export class MyAccountPage extends BasePage {
    /*
        cant use cy.get outside of methods because cypress will trigger
        '  > Cannot call cy.get() outside a running test.' error message

        the workaround is
            - initialize the text selectors
            - use the text selectors with cy.get to return the locators directly from the methods
    */

    private readonly userSettingsContainerSel: string = ".makeStyles-container-20";
    private readonly firstNameInputSel: string = '[data-test="user-settings-firstName-input"]';
    private readonly lastNameInputSel: string = '[data-test="user-settings-lastName-input"]';
    private readonly emailInputSel: string = '[data-test="user-settings-email-input"]';
    private readonly phoneInputSel: string = '[data-test="user-settings-phoneNumber-input"]';
    private readonly saveBtnSel: string = '[data-test="user-settings-submit"]';

    constructor() {
        super();
    }

    getUserSettingsContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.userSettingsContainerSel);
    }

    getFirstNameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.firstNameInputSel);
    }

    getLastNameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.lastNameInputSel);
    }

    getEmailInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.emailInputSel);
    }

    getPhoneInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.phoneInputSel);
    }

    getSaveBtnEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.saveBtnSel);
    }
}
