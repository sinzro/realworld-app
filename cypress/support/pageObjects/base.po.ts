/// <reference types="cypress" />

export class BasePage {
  /*
        cant use cy.get outside of methods because cypress will trigger
        '  > Cannot call cy.get() outside a running test.' error message

        the workaround is
            - initialize the text selectors
            - use the text selectors with cy.get to return the locators directly from the methods
    */

  private readonly sidenavSel: string = '[data-test="sidenav"]';
  private readonly accountBalanceSel: string = '[data-test="sidenav-user-balance"]';
  private readonly homeSel: string = '[data-test="sidenav-home"]';
  private readonly myAccountSel: string = '[data-test="sidenav-user-settings"]';
  private readonly bankAccountsSel: string = '[data-test="sidenav-bankaccounts"]';
  private readonly notificationsSel: string = '[data-test="sidenav-notifications"]';
  private readonly logoutSel: string = '[data-test="sidenav-signout"]';

  getSideNavEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.sidenavSel);
  }

  getAccountBalanceEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.accountBalanceSel);
  }

  getHomeEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.homeSel);
  }

  getMyAccountEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.myAccountSel);
  }

  getBankAccountsEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.bankAccountsSel);
  }

  getNotificationsEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.notificationsSel);
  }

  getLogoutEl(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.logoutSel);
  }
}
