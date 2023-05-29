/// <reference types="cypress" />

import { BasePage } from "@cy/support/pageObjects/base.po";

export class LoginSignUpPage extends BasePage {
    /*
        cant use cy.get outside of methods because cypress will trigger
        '  > Cannot call cy.get() outside a running test.' error message

        the workaround is
            - initialize the text selectors
            - use the text selectors with cy.get to return the locators directly from the methods
    */

    // sign in
    private readonly userNameInputSel: string = "#username";
    private readonly passwordInputSel: string = "#password";
    private readonly rememberMeCheckSel: string = "Remember Me";
    private readonly signInBtnSel: string = '[data-test="signin-submit"]';
    private readonly signUpLinkSel: string = '[data-test="signup"]';

    // sign up
    private readonly signUpFirstNameSel: string = "#firstName";
    private readonly signUpLastNameSel: string = '[data-test="signup-last-name"]';
    private readonly signUpUsernameInputSel: string = "#username";
    private readonly signUpPasswordInputSel: string = "#password";
    private readonly signUpConfirmPasswordInputSel: string = "#confirmPassword";
    private readonly signUpBtnSel: string = '[data-test="signup-submit"]';
    private readonly signInLinkSel: string = '[data-test="signin-submit"]';

    constructor() {
        super();
    }

    getUsernameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.userNameInputSel);
    }

    getPasswordInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.passwordInputSel);
    }

    getRememberMeCheckEl(): Cypress.Chainable<undefined> {
        return cy.contains(this.rememberMeCheckSel);
    }

    getSignInButtonEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signInBtnSel);
    }

    getSignupLinkEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpLinkSel);
    }

    getSignUpFirstNameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpFirstNameSel);
    }

    getSignUpLastNameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpLastNameSel);
    }

    getSignUpUsernameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpUsernameInputSel);
    }

    getSignUpPasswordInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpPasswordInputSel);
    }

    getSignUpConfirmPasswordInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpConfirmPasswordInputSel);
    }

    getSignUpButtonEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signUpBtnSel);
    }

    getSignInLinkEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.signInLinkSel);
    }
}
