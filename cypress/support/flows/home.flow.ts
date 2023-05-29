import { HomePage } from "@cy/support/pageObjects/home.po";
import { testData as td } from "@pw/support/other/test-data";

export class HomeFlow {
    readonly hp: HomePage = new HomePage();

    sideNavElIsVisible(): void {
        this.hp.getSideNavEl().should("be.visible");
    }

    accountBalanceElIsVisible(): void {
        this.hp.getAccountBalanceEl().should("be.visible");
    }

    transactionHistoryContainerElIsVisible(): void {
        this.hp.getTransactionHistoryContainerEl().should("be.visible");
    }

    goToMyAccount(): void {
        this.hp.getMyAccountEl().click();
    }

    goToBankAccounts(): void {
        this.hp.getBankAccountsEl().click();
    }

    goToTransactionDetails(index: number): void {
        this.hp.getTransactionHistoryItemEl(index).click();
        cy.url().should("contain", td.transactionUrl);
    }

    transactionDetailsAreVisible(): void {
        this.hp.getTransactionDetailListHeaderEl().should("be.visible");

        cy.url().then((url) => {
            this.hp.getTransactionDetailItemEl(url).should("be.visible");
        });
    }
}
