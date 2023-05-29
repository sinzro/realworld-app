import { Locator, Page} from "@playwright/test";
import { BasePage } from "./base.po";

export class HomePage extends BasePage {

    private readonly transactionHistoryContainerEl: Locator;
    private readonly transactionDetailListHeaderEl: Locator;

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.transactionHistoryContainerEl = page.locator('[data-test="transaction-list"]');
        this.transactionDetailListHeaderEl = page.locator('[data-test="transaction-detail-header"]');
    }

    getTransactionCode(url: string): string {
        const code = url.substring(url.lastIndexOf('/') + 1);
        return code;
    }

    getTransactionHistoryContainerEl(): Locator {
        return this.transactionHistoryContainerEl;
    }

    getTransactionHistoryItemEl(index: number): Locator {
        return this.page.locator("li", { hasText: "Payment" }).nth(index);
    }

    getTransactionDetailListHeaderEl(): Locator {
        return this.transactionDetailListHeaderEl;
    }

    getTransactionDetailItemEl(url: string): Locator {
        return this.page.locator(`[data-test="transaction-item-${this.getTransactionCode(url)}"]`);
    }
    
}