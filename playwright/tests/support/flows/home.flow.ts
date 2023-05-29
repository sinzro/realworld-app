import {Page, expect, test} from "@playwright/test";
import { HomePage } from "@pw/support/pageObjects/home.po";

export class HomeFlow {

    readonly hp: HomePage;

    constructor(page: Page) {
        this.hp = new HomePage(page);
    }

    async sideNavElIsVisible(): Promise<void> {
        await expect(this.hp.getSideNavEl()).toBeVisible();
    }

    async accountBalanceElIsVisible(): Promise<void> {
        await expect(this.hp.getAccountBalanceEl()).toBeVisible();
    }

    async transactionHistoryContainerElIsVisible(): Promise<void> {
        await expect(this.hp.getTransactionHistoryContainerEl()).toBeVisible();
    }

    async goToMyAccount(): Promise<void> {
        await this.hp.getMyAccountEl().click();
    }

    async goToBankAccounts(): Promise<void> {
        await this.hp.getBankAccountsEl().click();
    }

    async goToTransactionDetails(index: number): Promise<void> {

        await test.step("go to transaction details", async()=>{

            // prevent race condition
            await Promise.all([
                this.hp.page.waitForURL(/transaction/),
                this.hp.getTransactionHistoryItemEl(index).click()
            ]);
        });
    }

    async transactionDetailsAreVisible(): Promise<void> {
        await test.step("transaction details are visible", async()=>{

            const url = this.hp.page.url();
            await expect(this.hp.getTransactionDetailListHeaderEl()).toBeVisible();
            await expect(this.hp.getTransactionDetailItemEl(url)).toBeVisible();
        });

    }
}