import { Locator, Page, expect } from "playwright/test"

export default class homePage {
    readonly emailTextField: Locator;
    readonly passwordTextField: Locator;
    readonly signInButton: Locator;
    readonly listItems: Locator;
    readonly dropDownButton: Locator;
    readonly dropDownItem: Locator;
    readonly enabledButton: Locator;
    readonly disabledButton: Locator;
    readonly timedButton: Locator;
    readonly successfulMessageText: Locator;
    readonly tableBody: Locator;


    constructor(page: Page){
        this.emailTextField = page.getByRole('textbox', { name: 'Email address' });
        this.passwordTextField = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.listItems = page.locator('.list-group-item');
        this.dropDownButton = page.getByRole('button', { name: /Option \d+/ });
        this.dropDownItem = page.locator('.dropdown-item');
        this.enabledButton = page.locator('#test-4-div .btn-primary');
        this.disabledButton = page.locator('#test-4-div .btn-secondary');
        this.timedButton = page.locator('#test5-button');
        this.successfulMessageText = page.locator('#test5-alert');
        this.tableBody = page.locator('#test-6-div table tbody');


    }

    // Assert the Login Element Present
    async assertLoginElementsPresent(): Promise<void> {
        await expect(this.emailTextField).toBeVisible();
        await expect(this.passwordTextField).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    }

    // Fill in sign in email and password
    async fillLoginCredentials(email: string, password: string): Promise<void> {
        await this.emailTextField.fill(email);
        await this.passwordTextField.fill(password);
    }

    // Assert list item count
    async assertNumberOfListItemsCount(expectedNumber: number): Promise<void>{
        await expect(this.listItems).toHaveCount(expectedNumber);
    }

    // Assert list item text
    async assertListItemText(index:number, expectedText: string): Promise<void>{
        const itemText = this.listItems.nth(index);
        await expect(itemText).toContainText(expectedText);
    }

    // Assert list item badge text
    async assetNumberOfListItemsBadgeText(index:number, expectedBadgeText: string): Promise<void>{
        const badgeText = this.listItems.nth(index).locator('.badge');
        await expect(badgeText).toHaveText(expectedBadgeText);
    }

    // Assert default selected drop down value
    async  assertDefaultSelectedDropDownValue(defaultValue: string): Promise<void> {
        const defaultDropDownValue = this.dropDownButton;
        await expect(defaultDropDownValue).toHaveText(defaultValue);
    }

    // Select Option from drop down
    async selectOptionFromDropDown(optionName: string ): Promise<void> {
        await this.dropDownButton.click();
        const option = this.dropDownItem.filter({ hasText: optionName })
        await option.click();
    }

     // Method to assert that the first button is enabled
    async assertFirstButtonEnabled(): Promise<void> {
        await expect(this.enabledButton).toBeEnabled();
    }

    // Method to assert that the second button is disabled
    async assertSecondButtonDisabled(): Promise<void> {
        await expect(this.disabledButton).toBeDisabled();
    }

    // Wait for the button, click on it and verify the message
    async buttonClickAndMessageVerify(): Promise<void> {
        await this.timedButton.waitFor({ state: 'visible' });
        await this.timedButton.click();
        await expect(this.successfulMessageText).toBeVisible();
        await expect(this.successfulMessageText).toHaveText('You clicked a button!');
    }

    async retrieveTableValue(row: number, column: number): Promise<string> {
        const cell = this.tableBody.locator(`tr:nth-child(${row + 1}) td:nth-child(${column + 1})`);
        
        // Retrieve the text content and provide a default value if null
        const cellValue = await cell.textContent();
        return cellValue ?? ''; // Use an empty string as a fallback
    }


}