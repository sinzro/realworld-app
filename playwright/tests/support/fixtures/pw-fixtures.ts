import { constants } from "../other/constants";
import { BankAccountsFlow } from "../flows/bank-accounts.flow";
import { HomeFlow } from "../flows/home.flow";
import { LoginSignUpFlow } from "../flows/login-signup.flow";
import { MyAccountFlow } from "@pw/support/flows/my-account.flow";

import { expect, test as base, APIResponse } from "@playwright/test";

type pwFixtures = {
    baf: BankAccountsFlow;
    hf: HomeFlow;
    lf: LoginSignUpFlow;
    myf: MyAccountFlow;
    loginByAPI: APIResponse;
    seedDB: APIResponse;
    resetDB: APIResponse;
};

export const test = base.extend<pwFixtures>({
    loginByAPI: async ({ request }, use) => {
        const response = await request.post(`${constants.apiURL}/login`, {
            data: {
                username: constants.existingUser.username,
                password: constants.existingUser.password,
            },
        });

        await use(response);
        expect(response.ok()).toBeTruthy();
    },

    seedDB: async ({ request }, use) => {
        const response = await request.post(`${constants.apiURL}/testData/seed`);
        await use(response);
        expect(response.ok()).toBeTruthy();
    },

    resetDB: async ({ request }, use) => {
        const response = await request.post(`${constants.apiURL}/testData/reset`);
        await use(response);
        expect(response.ok()).toBeTruthy();
    },

    baf: async ({ page, request }, use) => {
        await use(new BankAccountsFlow(page, request));
    },
    hf: async ({ page }, use) => {
        await use(new HomeFlow(page));
    },
    lf: async ({ page }, use) => {
        await use(new LoginSignUpFlow(page));
    },

    myf: async ({ page }, use) => {
        await use(new MyAccountFlow(page));
    },
});

export { expect } from "@playwright/test";
