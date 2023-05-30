import { MyAccountPage } from "@cy/support/pageObjects/my-account.po";

export class MyAccountFlow {
  readonly myp: MyAccountPage = new MyAccountPage();

  userSettingsContainerElIsVisible(): void {
    this.myp.getUserSettingsContainer().should("be.visible");
  }

  updateUserDetails(firstName: string, lastName: string, email: string, phone: string): void {
    cy.log("update first name");
    this.myp.getFirstNameInputEl().clear();
    this.myp.getFirstNameInputEl().type(firstName);

    cy.log("update last name");
    this.myp.getLastNameInputEl().clear();
    this.myp.getLastNameInputEl().type(lastName);

    cy.log("update email");
    this.myp.getEmailInputEl().clear();
    this.myp.getEmailInputEl().type(email);

    cy.log("update phone");
    this.myp.getPhoneInputEl().clear();
    this.myp.getPhoneInputEl().type(phone);

    this.myp.getSaveBtnEl().click();
  }

  areUserDetailsUpdated(firstName: string, lastName: string, email: string, phone: string): void {
    cy.log("are firstName, lastName, email and phone updated?");
    cy.reload();
    this.myp.getFirstNameInputEl().should("have.value", firstName);
    this.myp.getLastNameInputEl().should("have.value", lastName);
    this.myp.getEmailInputEl().should("have.value", email);
    this.myp.getPhoneInputEl().should("have.value", phone);
  }
}
