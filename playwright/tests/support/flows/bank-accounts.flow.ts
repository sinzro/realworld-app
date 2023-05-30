import { APIResponse, APIRequestContext, Page, expect, test } from "@playwright/test";
import { BankAccountsPage } from "@pw/support/pageObjects/bank-accounts.po";
import db from "@root/data/database.json";
import { constants } from "@pw/support/other/constants";

export class BankAccountsFlow {
  readonly bap: BankAccountsPage;

  constructor(page: Page, request: APIRequestContext) {
    this.bap = new BankAccountsPage(page, request);
  }

  async addNewBankAccount(
    bankName: string,
    routingNumber: string,
    accountNumber: string
  ): Promise<void> {
    await test.step(
      "click create button and fill in form; save it to create a new bank account",
      async () => {
        await this.bap.getCreateNewBankAccountBtnEl().click();
        await this.bap.getBankNameInputEl().type(bankName);
        await this.bap.getRoutingNumberInputEl().type(routingNumber);
        await this.bap.getAccountNumberInputEl().type(accountNumber);
        await this.bap.getSaveBtnEl().click();
      }
    );
  }

  /**
   * checks to see if a bank account has been created successfully
   * expect to have at least one account from this bank
   * @param bankName name of the bank
   */
  async isNewBankAccountAdded(bankName: string): Promise<void> {
    await test.step("new bank account was created", async () => {
      await expect(this.bap.getBankAccountByName(bankName).last()).toBeVisible();
    });
  }

  async deleteBankAccount(bankName: string): Promise<void> {
    await test.step("delete bank account", async () => {
      const bankAccount = this.bap.getBankAccountByName(bankName).last();
      const deleteBankAccountBtn = this.bap.getDeleteBtnForBankAccount(bankAccount);

      await deleteBankAccountBtn.click();
    });

    await test.step("bank account is deleted", async () => {
      const deletedBankAccount = this.bap.getDeletedBankAccountByName(bankName).last();
      await expect(deletedBankAccount).toBeVisible();
    });
  }

  async getAllBankAccountsByApi(): Promise<void> {
    let bankAccountsResponse: APIResponse;
    let respBody: any;

    await test.step("get a list of all bank accounts", async () => {
      bankAccountsResponse = await this.bap.request.get(`${constants.apiURL}/bankAccounts`);
      respBody = await bankAccountsResponse.json();
    });

    await test.step("request was succesful", async () => {
      expect(bankAccountsResponse.ok()).toBeTruthy();
      expect(respBody.results[0].bankName).toBeTruthy();
    });
  }

  /**
   * get a user's first bank account id; the account must be active
   * @param userid - id of the user that has the bankaccount
   * @returns id of the bank account || '' if none is found
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
  async deleteBankAccountByApi(bankAccountId: string): Promise<void> {
    await test.step("error if no active bank accounts", async () => {
      expect(bankAccountId, "User has no active bank account").not.toHaveLength(0);
    });

    await test.step("account was deleted successfully", async () => {
      const response = await this.bap.request.delete(
        `${constants.apiURL}/bankAccounts/${bankAccountId}`
      );
      const resp = response.status();
      expect(response.ok()).toBeTruthy();
    });
  }
}
