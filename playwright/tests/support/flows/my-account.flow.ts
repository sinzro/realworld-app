import { Page, expect, test } from "@playwright/test";
import { MyAccountPage } from "@pw/support/pageObjects/my-account.po";

export class MyAccountFlow {
    readonly myp: MyAccountPage;

    constructor(page: Page) {
        this.myp = new MyAccountPage(page);
    }

    async userSettingsContainerElIsVisible(): Promise<void> {
        await expect(this.myp.getUserSettingsContainer()).toBeVisible();
    }

    async updateUserDetails(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {
        await test.step("update user details", async () => {
            await test.step("update first name", async () => {
                await this.myp.getFirstNameInputEl().clear();
                await this.myp.getFirstNameInputEl().type(firstName);
            });

            await test.step("update last name", async () => {
                await this.myp.getLastNameInputEl().clear();
                await this.myp.getLastNameInputEl().type(lastName);
            });

            await test.step("update email", async () => {
                await this.myp.getEmailInputEl().clear();
                await this.myp.getEmailInputEl().type(email);
            });

            await test.step("update phone", async () => {
                await this.myp.getPhoneInputEl().clear();
                await this.myp.getPhoneInputEl().type(phone);
            });

            await this.myp.getSaveBtnEl().click();
        });
    }

    async areUserDetailsUpdated(
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    ): Promise<void> {
        await test.step("are firstName, lastName, email and phone updated", async () => {
            await expect(this.myp.getFirstNameInputEl()).toHaveValue(firstName);
            await expect(this.myp.getLastNameInputEl()).toHaveValue(lastName);
            await expect(this.myp.getEmailInputEl()).toHaveValue(email);
            await expect(this.myp.getPhoneInputEl()).toHaveValue(phone);
        });
    }
}
