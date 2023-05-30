import { APIRequestContext, Page, Locator } from "@playwright/test";
import { BasePage } from "./base.po";

export class BankAccountsPage extends BasePage {
  // bank accounts
  private readonly bankAccountListEl: Locator;
  private readonly createNewBankAccountBtnEl: Locator;
  private readonly deleteBankAccountBtnEl: Locator;

  // create new bank account
  private readonly bankNameInputEl: Locator;
  private readonly routingNumberInputEl: Locator;
  private readonly accountNumberInputEl: Locator;
  private readonly saveBtnEl: Locator;

  page: Page;
  request: APIRequestContext;

  constructor(page: Page, request: APIRequestContext) {
    super(page);
    this.page = page;
    this.request = request;

    this.bankAccountListEl = page.locator('[data-test="bankaccount-list"]');
    this.createNewBankAccountBtnEl = page.locator('[data-test="bankaccount-new"]');
    this.deleteBankAccountBtnEl = page.locator('[data-test="bankaccount-delete"]');

    this.bankNameInputEl = page.getByPlaceholder("Bank Name");
    this.routingNumberInputEl = page.getByPlaceholder("Routing Number");
    this.accountNumberInputEl = page.getByPlaceholder("Account Number");
    this.saveBtnEl = page.locator('[data-test="bankaccount-submit"]');
  }

  getBankAccountListEl(): Locator {
    return this.bankAccountListEl;
  }

  /**
   *
   * @param bankName
   * @returns parent locator for the bank account that's not deleted
   */
  getBankAccountByName(bankName: string): Locator {
    // get the parent locator for the bank account - https://github.com/microsoft/playwright/issues/13286
    const newBankAccount = this.page.locator(`text="${bankName}"`);
    const parentNewBankAccount: Locator = this.getBankAccountListEl().locator("li", {
      has: newBankAccount,
    });

    return parentNewBankAccount;
  }

  getDeleteBtnForBankAccount(bankAccount: Locator): Locator {
    return bankAccount.locator(this.deleteBankAccountBtnEl);
  }

  getDeletedBankAccountByName(bankName: string): Locator {
    const deletedBankAccount = this.page.locator(`text="${bankName} (Deleted)"`);
    const parentDeletedBankAccount: Locator = this.getBankAccountListEl().locator("li", {
      has: deletedBankAccount,
    });

    return parentDeletedBankAccount;
  }

  getCreateNewBankAccountBtnEl(): Locator {
    return this.createNewBankAccountBtnEl;
  }

  getDeleteBankAccountBtnEl(): Locator {
    return this.deleteBankAccountBtnEl;
  }

  getBankNameInputEl(): Locator {
    return this.bankNameInputEl;
  }

  getRoutingNumberInputEl(): Locator {
    return this.routingNumberInputEl;
  }

  getAccountNumberInputEl(): Locator {
    return this.accountNumberInputEl;
  }

  getSaveBtnEl(): Locator {
    return this.saveBtnEl;
  }
}
