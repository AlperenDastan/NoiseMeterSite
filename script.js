const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Set up Chrome options
const chromeOptions = new chrome.Options();
// Add any additional options if needed

// Create a WebDriver instance
const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

// Example: UI Test for the provided HTML pages
(async function () {
  try {
    // Navigate to the index page
    await driver.get('https://noisemeter.azurewebsites.net/');

    // Example: Login Form Interaction
    const usernameInput = await driver.findElement(By.name('username'));
    await usernameInput.sendKeys('ADMIN');

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('Admin', Key.RETURN);
    await driver.sleep(5000);
    // Wait for the index page to load (adjust the condition accordingly)
    await driver.wait(until.titleIs('NoiseMeter'), 5000);

    // Click on the "Home" link to navigate to the front page
    const homeLink = await driver.findElement(By.id('homeLink'));
    await homeLink.click();

    // Wait for the front page to load (adjust the condition accordingly)
    await driver.wait(until.titleIs('NoiseMeter'), 5000);

    // Example: You can add more interactions based on the front page state
    // Click on the "Logout" button to log out
    const logoutButton = await driver.findElement(By.id('logoutButton'));
    await logoutButton.click();

// Wait for the page to load after logout (adjust the condition accordingly)
    await driver.wait(until.titleIs('NoiseMeter'), 5000);

    // Pause for a few seconds before closing the WebDriver session
await driver.sleep(5000);

  } finally {
    // Close the WebDriver session
    await driver.quit();
  }
})();