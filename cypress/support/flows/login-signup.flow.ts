/// <reference types="cypress" />
import { LoginSignUpPage } from "@cy/support/pageObjects/login-signup.po";
import { testData } from "@pw/support/other/test-data";

export class LoginSignUpFlow {
  lp: LoginSignUpPage = new LoginSignUpPage();

  doLogin(username: string, password: string): void {
    this.lp.getUsernameInputEl().type(username);
    this.lp.getPasswordInputEl().type(password);
    this.lp.getSignInButtonEl().click();
  }

  isLoggedIn(): void {
    cy.url().should("not.contain", testData.signInUrl);
  }

  doSignup(firstName: string, lastName: string, username: string, password: string): void {
    this.lp.getSignupLinkEl().click();
    cy.log("fill in signup data");
    this.lp.getSignUpFirstNameInputEl().type(firstName);
    this.lp.getSignUpLastNameInputEl().type(lastName);
    this.lp.getSignUpUsernameInputEl().type(username);
    this.lp.getSignUpPasswordInputEl().type(password);
    this.lp.getSignUpConfirmPasswordInputEl().type(password);

    cy.log("click signup button");
    this.lp.getSignUpButtonEl().click();

    cy.log("should be redirected to the sign in page");
    cy.url().should("contain", testData.signInUrl);
  }
}
