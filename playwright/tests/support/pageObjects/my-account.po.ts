import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.po";

export class MyAccountPage extends BasePage {

    private readonly userSettingsContainerEl: Locator;
    private readonly firstNameInputEl: Locator;
    private readonly lastNameInputEl: Locator;
    private readonly emailInputEl: Locator;
    private readonly phoneInputEl: Locator;
    private readonly saveBtnEl: Locator;

    constructor(page: Page) {
        super(page);

        this.userSettingsContainerEl = page.getByText('User SettingsSave');
        this.firstNameInputEl = page.locator('[data-test="user-settings-firstName-input"]');
        this.lastNameInputEl = page.locator('[data-test="user-settings-lastName-input"]');
        this.emailInputEl = page.locator('[data-test="user-settings-email-input"]');
        this.phoneInputEl = page.locator('[data-test="user-settings-phoneNumber-input"]');
        this.saveBtnEl = page.locator('[data-test="user-settings-submit"]');
    }

    getUserSettingsContainer(): Locator {
        return this.userSettingsContainerEl;
    }

    getFirstNameInputEl(): Locator {
        return this.firstNameInputEl;
    }

    getLastNameInputEl(): Locator {
        return this.lastNameInputEl;
    }

    getEmailInputEl(): Locator {
        return this.emailInputEl;
    }

    getPhoneInputEl(): Locator {
        return this.phoneInputEl;
    }

    getSaveBtnEl(): Locator {
        return this.saveBtnEl;
    }
}