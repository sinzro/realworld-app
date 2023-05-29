import { APIResponse, Page, expect, test } from '@playwright/test'
import { LoginSignUpPage } from '@pw/support/pageObjects/login-signup.po'

export class LoginSignUpFlow {
  readonly lp: LoginSignUpPage

  constructor(page: Page) {
    this.lp = new LoginSignUpPage(page)
  }

  async typeUsername(text: string): Promise<void> {
    await this.lp.getUsernameInputEl().type(text)
  }
  async typePassword(text: string): Promise<void> {
    await this.lp.getPasswordInputEl().type(text)
  }

  async clickSignInButton(): Promise<void> {
    await this.lp.getSignInButtonEl().click()
  }

  async clickSignupLink(): Promise<void> {
    await this.lp.getSignupLinkEl().click()
  }

  async clickRememberMeCheck(): Promise<void> {
    await this.lp.getRememberMeCheckEl().click()
  }

  async doLogin(username: string, password: string): Promise<void> {
    await test.step('Loggin In', async () => {
      await this.typeUsername(username)
      await this.typePassword(password)

      // prevent race conditions
      await Promise.all([this.lp.page.waitForURL('/'), this.clickSignInButton()])
    })
  }

  async doLoginByAPI(username: string, password: string): Promise<void> {
    const apiResponse: APIResponse = await this.lp.page.request.post(`/login`, {
      data: {
        username,
        password,
      },
    })

    expect(apiResponse.status).toBe(200)
  }

  async isLoggedIn(): Promise<void> {
    await test.step('is Logged In', async () => {
      await expect(this.lp.getSignInButtonEl()).not.toBeVisible()
    })
  }

  async doSignup(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ): Promise<void> {
    await this.lp.getSignUpFirstNameInputEl().type(firstName)
    await this.lp.getSignUpLastNameInputEl().type(lastName)
    await this.lp.getSignUpUsernameInputEl().type(username)
    await this.lp.getSignUpPasswordInputEl().type(password)
    await this.lp.getSignUpConfirmPasswordInputEl().type(password)
    await this.lp.getSignUpButtonEl().click()
  }
}
