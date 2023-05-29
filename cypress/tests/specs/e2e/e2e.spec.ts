/**
 * TO DO:
- Should register a new account
- Should log in with existing account
- Should see account details
- Should see account balance
- Should see account transactions history
- Should see account transaction details
- Should update account user settings
- Should add new bank account
- Should delete bank account
 */

/// <reference types="cypress" />
import { BankAccountsFlow } from "@cy/support/flows/bank-accounts.flow";
import { HomeFlow } from "@cy/support/flows/home.flow";
import { LoginSignUpFlow } from "@cy/support/flows/login-signup.flow";
import { MyAccountFlow } from "@cy/support/flows/my-account.flow";
import { constants } from "@pw/support/other/constants";
import { testData as td } from "@pw/support/other/test-data";

describe("register new account and logging in", () => {
    const lf: LoginSignUpFlow = new LoginSignUpFlow();

    beforeEach(() => {
        cy.visit("/");
    });

    it("Should register a new account", () => {
        lf.doSignup(
            td.newUser.firstName,
            td.newUser.lastName,
            td.newUser.username,
            td.newUser.password
        );

        lf.doLogin(td.newUser.username, td.newUser.password);
        lf.isLoggedIn();
    });

    it("Should log in with existing account", () => {
        lf.doLogin(constants.existingUser.username, constants.existingUser.password);
        lf.isLoggedIn();
    });
});

describe("main e2e", () => {
    const baf: BankAccountsFlow = new BankAccountsFlow();
    const hf: HomeFlow = new HomeFlow();
    const lf: LoginSignUpFlow = new LoginSignUpFlow();
    const myf: MyAccountFlow = new MyAccountFlow();

    beforeEach(() => {
        cy.task("db:seed");

        cy.visit("/");
        lf.doLogin(constants.existingUser.username, constants.existingUser.password);
    });

    it("Should see account details", () => {
        hf.goToMyAccount();
        myf.userSettingsContainerElIsVisible();
    });

    it("Should see account balance", () => {
        hf.accountBalanceElIsVisible();
    });

    it("Should see transaction history", () => {
        hf.transactionHistoryContainerElIsVisible();
    });

    it("Should see transaction details", () => {
        hf.goToTransactionDetails(0);
        hf.transactionDetailsAreVisible();
    });

    it("Should update account user settings", () => {
        cy.log("go to my account and update user settings");
        hf.goToMyAccount();
        myf.updateUserDetails(
            td.newUser.firstName,
            td.newUser.lastName,
            td.newUser.email,
            td.newUser.phone
        );

        cy.log("are the user settings updated?");
        myf.areUserDetailsUpdated(
            td.newUser.firstName,
            td.newUser.lastName,
            td.newUser.email,
            td.newUser.phone
        );
    });

    it("Should add new bank account", () => {
        cy.log("go to bank accounts");
        hf.goToBankAccounts();

        cy.log("add new bank account");
        baf.addNewBankAccount(
            td.newUser.bankName,
            td.newUser.routingNumber,
            td.newUser.accountNumber
        );

        cy.log("check if new bank account exists");
        baf.isNewBankAccountAdded(td.newUser.bankName);
    });

    it("Should delete bank account", () => {
        hf.goToBankAccounts();
        baf.deleteBankAccount(constants.existingUser.bankName);
    });
});
