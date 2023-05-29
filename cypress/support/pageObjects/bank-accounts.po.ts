/// <reference types="cypress" />
import { BasePage } from "./base.po";

export class BankAccountsPage extends BasePage {
    /*
        cant use cy.get outside of methods because cypress will trigger
        '  > Cannot call cy.get() outside a running test.' error message

        the workaround is
            - initialize the text selectors
            - use the text selectors with cy.get to return the locators directly from the methods
    */

    // bank accounts
    private readonly bankAccountListSel: string = '[data-test="bankaccount-list"]';
    private readonly createNewBankAccountBtnSel: string = '[data-test="bankaccount-new"]';
    private readonly deleteBankAccountBtnSel: string = '[data-test="bankaccount-delete"]';

    // create new bank account
    private readonly bankNameInputSel: string = "#bankaccount-bankName-input";
    private readonly routingNumberInputSel: string = "#bankaccount-routingNumber-input";
    private readonly accountNumberInputSel: string = "#bankaccount-accountNumber-input";
    private readonly saveBtnSel: string = '[data-test="bankaccount-submit"]';

    constructor() {
        super();
    }

    getBankAccountListEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.bankAccountListSel);
    }

    /**
     *
     * @param bankName
     * @returns parent Cypress.Chainable<JQuery<HTMLElement>> for the bank account that's not deleted
     */
    getBankAccountByName(bankName: string): Cypress.Chainable<JQuery<HTMLElement>> {
        cy.log("look through all divs and get only the `${bankName} (Deleted)` one");
        const newBankAccount: Cypress.Chainable = cy.get("div").filter((index, element) => {
            return Cypress.$(element).text().trim() === bankName;
        });

        return newBankAccount;
    }

    getDeleteBtnForBankAccount(
        bankAccount: Cypress.Chainable<JQuery<HTMLElement>>
    ): Cypress.Chainable<JQuery<HTMLButtonElement>> {
        return bankAccount.find("button");
    }

    getDeletedBankAccountByName(bankName: string): Cypress.Chainable<JQuery<HTMLElement>> {
        cy.log("look through all divs and get only the `${bankName} (Deleted)` one");
        const deletedBankAccount: Cypress.Chainable = cy.get("div").filter((index, element) => {
            return Cypress.$(element).text().trim() === `${bankName} (Deleted)`;
        });

        const parentDeletedBankAccount: Cypress.Chainable<JQuery<HTMLElement>> =
            deletedBankAccount.parent();

        return parentDeletedBankAccount;
    }

    getCreateNewBankAccountBtnEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.createNewBankAccountBtnSel);
    }

    getDeleteBankAccountBtnEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.deleteBankAccountBtnSel);
    }

    getBankNameInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.bankNameInputSel);
    }

    getRoutingNumberInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.routingNumberInputSel);
    }

    getAccountNumberInputEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.accountNumberInputSel);
    }

    getSaveBtnEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.saveBtnSel);
    }
}
