import { Locator, Page } from "@playwright/test";

export class LoginSignUpPage {
  private readonly usernameInputEl: Locator;
  private readonly passwordInputEl: Locator;
  private readonly rememberMeCheckEl: Locator;
  private readonly signInButtonEl: Locator;
  private readonly signUpLinkEl: Locator;

  private readonly signUpFirstNameInputEl: Locator;
  private readonly signUpLastNameInputEl: Locator;
  private readonly signUpUsernameInputEl: Locator;
  private readonly signUpPasswordInputEl: Locator;
  private readonly signUpConfirmPasswordInputEl: Locator;
  private readonly signUpButtonEl: Locator;
  private readonly signInLinkEl: Locator;

  readonly page: Page;
  private readonly newUserDialogEl: Locator;

  constructor(page: Page) {
    this.usernameInputEl = page.getByLabel("Username");
    this.passwordInputEl = page.locator("#password");
    this.rememberMeCheckEl = page.getByLabel("Remember me");
    this.signInButtonEl = page.locator("[data-test='signin-submit']");
    this.signUpLinkEl = page.locator('[data-test="signup"]');

    this.signUpFirstNameInputEl = page.getByLabel("First name *");
    this.signUpLastNameInputEl = page.getByLabel("Last name *");
    this.signUpUsernameInputEl = page.getByLabel("Username *");
    this.signUpPasswordInputEl = page.locator("#password");
    this.signUpConfirmPasswordInputEl = page.locator("#confirmPassword");
    this.signUpButtonEl = page.locator("[data-test='signup-submit']");
    this.signInLinkEl = page.locator("[data-test='signin']");

    this.page = page;
    this.newUserDialogEl = page.getByRole("dialog");
  }

  getUsernameInputEl(): Locator {
    return this.usernameInputEl;
  }

  getPasswordInputEl(): Locator {
    return this.passwordInputEl;
  }

  getRememberMeCheckEl(): Locator {
    return this.rememberMeCheckEl;
  }

  getSignInButtonEl(): Locator {
    return this.signInButtonEl;
  }

  getSignupLinkEl(): Locator {
    return this.signUpLinkEl;
  }

  getSignUpFirstNameInputEl(): Locator {
    return this.signUpFirstNameInputEl;
  }

  getSignUpLastNameInputEl(): Locator {
    return this.signUpLastNameInputEl;
  }

  getSignUpUsernameInputEl(): Locator {
    return this.signUpUsernameInputEl;
  }

  getSignUpPasswordInputEl(): Locator {
    return this.signUpPasswordInputEl;
  }

  getSignUpConfirmPasswordInputEl(): Locator {
    return this.signUpConfirmPasswordInputEl;
  }

  getSignUpButtonEl(): Locator {
    return this.signUpButtonEl;
  }

  getSignInLinkEl(): Locator {
    return this.signInLinkEl;
  }

  getNewUserDialogEl(): Locator {
    return this.newUserDialogEl;
  }
}
