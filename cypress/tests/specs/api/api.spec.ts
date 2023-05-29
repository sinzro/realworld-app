/**
 * TODO:
- Gets a list of bank accounts for user (GET /bankAccounts)
- Deletes a bank account (DELETE /:bankAccountId)
- Get a user profile by username (GET /users/profile/:username)
- Creates a new comment for a transactions
(POST /comments/:transactionId, fields : content (string))
- Gets list of users (GET /users)
 */

/// <reference types="cypress" />
import db from "@root/data/database.json";
import { constants } from "@pw/support/other/constants";
import { BankAccountsFlow } from "@cy/support/flows/bank-accounts.flow";
import { testData as td } from "@pw/support/other/test-data";

// to delete below

describe("api tests", () => {
    const baf = new BankAccountsFlow();

    beforeEach(() => {
        cy.log("loginByApi && reset database before each test");
        cy.task("db:reset");
        cy.loginByApi(constants.existingUser.username, constants.existingUser.password).then(
            (response: Cypress.Response<any>) => {
                expect(response.isOkStatusCode).to.be.true;
            }
        );
    });

    it("get a list of bank accounts", () => {
        baf.getAllBankAccountsByApi();
    });

    it("delete a bank account", () => {
        const bankAccountId = baf.getBankAccountIdFromDB(constants.existingUser.userid);
        baf.deleteBankAccountByApi(bankAccountId);
    });

    it("get a user profile by username", () => {
        cy.log("get specific profile successfully");
        const username = db.users[1].username;
        cy.request({
            method: "Get",
            url: `${constants.apiURL}/users/profile/${username}`,
        }).then((response) => {
            cy.log("request was successful");
            expect(response.isOkStatusCode).to.be.true;
            expect(response.body.user).to.have.property("firstName");
        });
    });

    it("create a new comment for a transactions", () => {
        cy.log("post a transaction comment successfully");
        cy.request({
            method: "Post",
            url: `${constants.apiURL}/comments/${td.transactionId}`,
            body: {
                content: td.commentContent,
            },
        }).then((response) => {
            cy.log("post was successful");
            expect(response.isOkStatusCode).to.be.true;
        });
    });

    it("get list of users", () => {
        cy.log("get list of users successfully");
        cy.request({
            method: "Get",
            url: `${constants.apiURL}/users/`,
        }).then((response) => {
            cy.log("request was successful");
            expect(response.isOkStatusCode).to.be.true;
            expect(response.body.results).to.have.length.greaterThan(0);
        });
    });
});
