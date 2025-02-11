import {test, expect} from '../fixtures/basePages'

test.beforeEach(async ({page}) => {
  await page.goto("http://selenium-python-resolver.s3-website.us-east-2.amazonaws.com/");
});

test.describe('Home Page Test Suite', () => {
  test('Test 1: Verify Login Form Presence and Input Functionality', async ({homePage}) => {
    // Assert that the email input field, password input field and sign in button are visible on the page
    await homePage.assertLoginElementsPresent();

    // Fill in the login crediential
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    await homePage.fillLoginCredentials(testEmail, testPassword);

  });

  test('Test 2: Verify List Group Values in Test 2 Div', async ({homePage}) => {
    // In the test 2 div, assert that there are three values in the listgroup
    await homePage.assertNumberOfListItemsCount (3);

    // Assert that the second list item's value is set to "List Item 2"
    await homePage.assertListItemText (1, "List Item 2");

    // Assert that the second list item's badge value is 6
    await homePage.assertListItemText (1, "6");
  });

  test('Test 3: Verify default selection and change dropdown value in Test 3 div', async ({homePage}) => {
    // In the test 3 div, assert that "Option 1" is the default selected value
    await homePage.assertDefaultSelectedDropDownValue("Option 1")

    // Select "Option 3" from the select list
    await homePage.selectOptionFromDropDown("Option 3");

    // Assert select dropdown shown
    await homePage.assertDefaultSelectedDropDownValue("Option 3");

  });

  test('Test 4: Verify button states in Test 4 div', async ({homePage}) => {
    // Assert that the first button is enabled
    await homePage.assertFirstButtonEnabled();

    // Assert that the second button is disabled
    await homePage.assertSecondButtonDisabled();

  });
  
  test('Test 5: Wait for button to appear, click it, and verify success message', async ({homePage}) => {
    await homePage.buttonClickAndMessageVerify();
  });

  test('Test 6: Verify cell value in a table grid', async ({homePage}) => {
    const cellValue = await homePage.retrieveTableValue(2, 2);
    await expect(cellValue).toBe('Ventosanzap');
  });

});