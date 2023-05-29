/// <reference types="cypress" />
import { BasePage } from "./base.po";

export class HomePage extends BasePage {
    private readonly transactionHistoryContainerSel: string = '[data-test="transaction-list"]';
    private readonly transactionDetailListHeaderSel: string =
        '[data-test="transaction-detail-header"]';

    constructor() {
        super();
    }

    getTransactionCode(url: string): string {
        const code = url.substring(url.lastIndexOf("/") + 1);
        return code;
    }

    getTransactionHistoryContainerEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.transactionHistoryContainerSel);
    }

    getTransactionHistoryItemEl(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("li").contains("Payment").eq(index);
    }

    getTransactionDetailListHeaderEl(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.transactionDetailListHeaderSel);
    }

    getTransactionDetailItemEl(url: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`[data-test="transaction-item-${this.getTransactionCode(url)}"]`);
    }
}
