/**
 * TODO:
- Gets a list of bank accounts for user (GET /bankAccounts)
- Deletes a bank account (DELETE /:bankAccountId)
- Get a user profile by username (GET /users/profile/:username)
- Creates a new comment for a transactions
(POST /comments/:transactionId, fields : content (string))
- Gets list of users (GET /users)
 */

import { APIResponse } from "@playwright/test";
import { test, expect } from "@pw/support/fixtures/pw-fixtures";
import { constants } from "@pw/support/other/constants";
import { testData as td } from "@pw/support/other/test-data";
import db from "@root/data/database.json";

test.describe("api tests", () => {
    test.beforeEach(async ({ resetDB, loginByAPI }) => {
        await test.step("loginByApi && reset database before each test", async () => {
            // loginByAPI and resetDB are fixtures, so there's no need to do anything else
        });
    });

    test("get a list of bank accounts", async ({ baf }) => {
        await baf.getAllBankAccountsByApi();
    });

    test("delete a bank account", async ({ baf }) => {
        const bankAccountId = baf.getBankAccountIdFromDB(constants.existingUser.userid);
        await baf.deleteBankAccountByApi(bankAccountId);
    });

    test("get a user profile by username", async ({ request }) => {
        await test.step("get specific profile successfully", async () => {
            const username = db.users[1].username;
            const resp: APIResponse = await request.get(
                `${constants.apiURL}/users/profile/${username}`
            );
            expect(resp.ok()).toBeTruthy();
            const respJson = await resp.json();
            expect(respJson.user).toBeTruthy();
        });
    });

    test("create a new comment for a transactions", async ({ request }) => {
        await test.step("post a transaction comment successfully", async () => {
            const resp = await request.post(`${constants.apiURL}/comments/${td.transactionId}`, {
                data: {
                    content: td.commentContent,
                },
            });
            expect(resp.ok()).toBeTruthy();
        });
    });

    test("get list of users", async ({ request }) => {
        await test.step("get list of users successfully", async () => {
            const response: APIResponse = await request.get(`${constants.apiURL}/users/`);
            const respJson: any = await response.json();

            expect(response.ok()).toBeTruthy();
            expect(respJson.results.length).toBeGreaterThan(0);
        });
    });
});
