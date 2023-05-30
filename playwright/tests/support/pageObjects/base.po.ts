import { Locator, Page } from "@playwright/test";

export class BasePage {
  private readonly sidenavEl: Locator;
  private readonly accountBalanceEl: Locator;
  private readonly homeEl: Locator;
  private readonly myAccountEl: Locator;
  private readonly bankAccountsEl: Locator;
  private readonly notificationsEL: Locator;
  private readonly logoutEl: Locator;

  constructor(page: Page) {
    this.sidenavEl = page.locator('[data-test="sidenav"]');
    this.accountBalanceEl = page.locator("[data-test='sidenav-user-balance']");
    this.homeEl = page.locator('[data-test="sidenav-home"]');
    this.myAccountEl = page.locator('[data-test="sidenav-user-settings"]');
    this.bankAccountsEl = page.locator('[data-test="sidenav-bankaccounts"]');
    this.notificationsEL = page.locator('[data-test="sidenav-notifications"]');
    this.logoutEl = page.locator('[data-test="sidenav-signout"]');
  }

  getSideNavEl(): Locator {
    return this.sidenavEl;
  }

  getAccountBalanceEl(): Locator {
    return this.accountBalanceEl;
  }

  getHomeEl(): Locator {
    return this.homeEl;
  }

  getMyAccountEl(): Locator {
    return this.myAccountEl;
  }

  getBankAccountsEl(): Locator {
    return this.bankAccountsEl;
  }

  getNotificationsEl(): Locator {
    return this.notificationsEL;
  }

  getLogoutEl(): Locator {
    return this.logoutEl;
  }
}
