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

import { constants } from "@pw/support/other/constants";
import { testData as td } from "@pw/support/other/test-data";
import { test, expect } from "@pw/support/fixtures/pw-fixtures";

test.describe("register new account and logging in", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("Should register a new account", async ({ lf }) => {
        await test.step("click on the sign up button", async () => {
            // remove focus form input el, and click on the sign up button
            await lf.lp.getSignInButtonEl().focus();
            await lf.lp.getSignupLinkEl().click();
        });

        await test.step("register new account && redirect to the sign in page", async () => {
            // register a new account
            await lf.doSignup(
                td.newUser.firstName,
                td.newUser.lastName,
                td.newUser.username,
                td.newUser.password
            );

            // redirect to sign in page
            await expect(lf.lp.getSignInButtonEl()).toBeVisible();
        });

        await test.step("sign in with new account", async () => {
            await lf.doLogin(td.newUser.username, td.newUser.password);
            await expect(lf.lp.getSignInButtonEl()).not.toBeVisible();
        });
    });

    test("Should log in with existing account", async ({ lf }) => {
        await test.step("log in; check to see if logged in", async () => {
            await lf.doLogin(constants.existingUser.username, constants.existingUser.password);
            await lf.isLoggedIn();
        });
    });
});

test.describe("main e2e", () => {
    test.beforeEach(async ({ page, lf, resetDB }) => {
        await test.step("reset db && go to baseURL && login", async () => {
            await page.goto("/");
            await lf.doLogin(constants.existingUser.username, constants.existingUser.password);
        });
    });

    test.afterAll(async ({ resetDB }) => {});

    test("Should see account details", async ({ hf, myf }) => {
        await test.step("go to my account && check if user details are visible", async () => {
            await hf.goToMyAccount();
            await myf.userSettingsContainerElIsVisible();
        });
    });

    test("Should see account balance", async ({ hf }) => {
        await test.step("account balance is visible", async () => {
            await hf.accountBalanceElIsVisible();
        });
    });

    test("Should see transaction history", async ({ hf }) => {
        await test.step("transaction history is visible", async () => {
            await hf.transactionHistoryContainerElIsVisible();
        });
    });

    test("Should see transaction details", async ({ hf }) => {
        await test.step(
            "click on first transaction && transaction details are visible",
            async () => {
                await hf.goToTransactionDetails(0);
                await hf.transactionDetailsAreVisible();
            }
        );
    });

    test("Should update account user settings", async ({ hf, myf }) => {
        await test.step("go to my account and update user details", async () => {
            await hf.goToMyAccount();
            await myf.updateUserDetails(
                td.newUser.firstName,
                td.newUser.lastName,
                td.newUser.email,
                td.newUser.phone
            );
        });

        await test.step("check that user details have been updated", async () => {
            await myf.areUserDetailsUpdated(
                td.newUser.firstName,
                td.newUser.lastName,
                td.newUser.email,
                td.newUser.phone
            );
        });
    });

    test("Should add new bank account", async ({ hf, baf }) => {
        await test.step("add a new bank account", async () => {
            await hf.goToBankAccounts();
            await baf.addNewBankAccount(
                td.newUser.bankName,
                td.newUser.routingNumber,
                td.newUser.accountNumber
            );
        });

        await test.step("check that new bank account is added", async () => {
            await baf.isNewBankAccountAdded(td.newUser.bankName);
        });
    });

    test("Should delete bank account", async ({ hf, baf }) => {
        await test.step("delete bank account && check if account was deleted", async () => {
            await hf.goToBankAccounts();
            await baf.deleteBankAccount(constants.existingUser.bankName);
        });
    });
});
