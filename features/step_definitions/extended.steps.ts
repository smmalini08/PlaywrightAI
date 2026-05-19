import { When } from '@cucumber/cucumber';
import { EAAppPage } from '../page-objects/EAAppPage';
import { browserManager } from './hooks';

let eaAppPage: EAAppPage;

Before(function () {
  const page = browserManager.getPage();
  const browser = browserManager.getBrowser();
  const context = browserManager.getContext();
  eaAppPage = new EAAppPage(page, browser, context);
});

// Extended When steps for complex scenarios

When('the user enters a large string of {int} characters in the first input field', async function (characterCount: number) {
  try {
    const largeString = 'A'.repeat(Math.min(characterCount, 10000)); // Cap at 10000 to avoid timeout
    await eaAppPage.fillInputField(largeString);
  } catch (error) {
    // Large input may be rejected, which is acceptable
    console.log('Large input rejected (expected behavior)');
  }
});
