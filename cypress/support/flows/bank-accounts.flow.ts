import { BankAccountsPage } from "@cy/support/pageObjects/bank-accounts.po";
import db from "@root/data/database.json";
import { constants } from "@pw/support/other/constants";

export class BankAccountsFlow {
    bap: BankAccountsPage = new BankAccountsPage();

    addNewBankAccount(bankName: string, routingNumber: string, accountNumber: string): void {
        this.bap.getCreateNewBankAccountBtnEl().click();
        this.bap.getBankNameInputEl().type(bankName);
        this.bap.getRoutingNumberInputEl().type(routingNumber);
        this.bap.getAccountNumberInputEl().type(accountNumber);
        this.bap.getSaveBtnEl().click();
    }

    /**
     * checks to see if a bank account has been created successfully
     * expect to have at least one account from this bank
     * @param bankName name of the bank
     */
    isNewBankAccountAdded(bankName: string): void {
        this.bap.getBankAccountByName(bankName).last().should("be.visible");
    }

    deleteBankAccount(bankName: string): void {
        cy.log("delete bank account");
        const bankAccount = this.bap.getBankAccountByName(bankName).last().parent();
        const deleteBankAccountBtn = this.bap.getDeleteBtnForBankAccount(bankAccount);
        deleteBankAccountBtn.click();

        cy.log("is bank account deleted");
        const deletedBankAccount = this.bap.getDeletedBankAccountByName(bankName).first();
        deletedBankAccount.should("be.visible");
    }

    getAllBankAccountsByApi(): void {
        cy.log("get a list of all bank accounts");
        cy.request({
            method: "Get",
            url: `${constants.apiURL}/bankAccounts`,
        }).then((response) => {
            cy.log("request was succesful");
            expect(response.isOkStatusCode).to.be.true;
            // expect(response.body.results[0].bankName).to.be.true;
            expect(response.body).to.have.property("results");
        });
    }

    /**
     * get a user's first bank account id; the account must be active
     * @param userid - id of the user that has the bankaccount
     * @returns id of the bank account || '1' if none is found
     */
    getBankAccountIdFromDB(userid: string): string {
        for (let bankAccount of db.bankaccounts) {
            if (bankAccount.userId === userid && !bankAccount.isDeleted) return bankAccount.id;
        }

        return "";
    }

    /**
     * delete an user's bank account
     * trigger error if user has no active bank account
     * @param userid of the user that will have it's bankaccount deleted
     * @returns bank account was deleted || user has no active bank account
     */
    deleteBankAccountByApi(bankAccountId: string): void {
        cy.log("account was deleted successfully");

        cy.request({
            method: "Delete",
            url: `${constants.apiURL}/bankAccounts/${bankAccountId}`,
        }).then((response) => {
            expect(response.isOkStatusCode).to.be.true;
        });
    }
}
