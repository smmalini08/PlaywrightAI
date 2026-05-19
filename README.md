# PlaywrightAI - Cucumber BDD with POM Framework

Professional Playwright test automation framework using Cucumber BDD with Gherkin syntax and Page Object Model (POM) pattern for testing **http://eaapp.somee.com/**.

## 🎯 Framework Architecture

### **Behavior-Driven Development (BDD)**
- Feature files written in Gherkin syntax
- Business-readable test scenarios
- Separation of concerns between features and code

### **Page Object Model (POM)**
- BasePage: Common functionality for all pages
- EAAppPage: Application-specific page object
- Maintainable and scalable code structure

### **Cucumber Integration**
- Seamless step definitions
- Support for scenario tags and filtering
- Multiple reporting formats (HTML, JSON, JUnit)

## 📁 Project Structure

```
PlaywrightAI/
├── features/
│   ├── page-objects/
│   │   ├── BasePage.ts                    # Base class with common methods
│   │   └── EAAppPage.ts                   # Application-specific page object
│   ├── step_definitions/
│   │   ├── hooks.ts                       # Before/After lifecycle hooks
│   │   ├── eaapp.steps.ts                 # Main step definitions
│   │   └── extended.steps.ts              # Extended step definitions
│   ├── eaapp-positive.feature             # Positive test scenarios (6 scenarios)
│   ├── eaapp-negative.feature             # Negative test scenarios (8 scenarios)
│   └── eaapp-security-performance.feature # Security & performance tests (6 scenarios)
├── test-results/                          # Test reports and screenshots
├── cucumber.js                            # Cucumber configuration
├── package.json                           # Dependencies and scripts
├── tsconfig.json                          # TypeScript configuration
└── README.md                              # This file
```

## 📋 Feature Files Overview

### ✅ **eaapp-positive.feature** (6 Scenarios)
- `@smoke` - Verify homepage loads successfully
- `@positive @ui` - Verify page contains expected UI elements
- `@positive @responsive @mobile` - Verify page is responsive on mobile view
- `@positive @responsive @tablet` - Verify page is responsive on tablet view
- `@positive @interactive` - Verify clickable elements are interactive
- `@positive @performance` - Verify page content loads within acceptable time

### ❌ **eaapp-negative.feature** (8 Scenarios)
- `@negative @error-handling` - Verify 404 error for non-existent page
- `@negative @security @sql-injection` - Verify SQL Injection attempt is handled
- `@negative @security @xss` - Verify XSS attack prevention
- `@negative @validation` - Verify empty form submission handling
- `@negative @timeout` - Verify handling of network timeout
- `@negative @input-validation` - Verify special characters in URL are handled
- `@negative @input-validation @large-input` - Verify large input string handling
- `@negative @stress-test` - Verify rapid consecutive requests handling

### 🔐 **eaapp-security-performance.feature** (6 Scenarios)
- `@security @sensitive-data` - Verify no sensitive data in console logs
- `@performance @resources` - Verify CSS and JS resources load successfully
- `@performance @load-time` - Verify page load time performance
- `@performance @responsive @desktop` - Verify desktop view responsiveness
- `@accessibility` - Verify basic page accessibility
- `@security @error-messages` - Verify no sensitive data in error messages

## 🛠️ Step Definitions

### **Given Steps** (Setup)
- `Given the user navigates to the EAApp homepage`
- `Given the user is on the EAApp homepage`
- `Given the user sets the viewport to {string} size`
- `Given the user sets the page timeout to {int} seconds`

### **When Steps** (Actions)
- `When the user waits for the page to load`
- `When the user clicks on the first clickable element`
- `When the user submits an empty form`
- `When the user navigates to {string}`
- `When the user tries to access {string}`
- `When the user enters {string} in the first input field`
- `When the user hovers over the first button`
- `When the user measures the page load time`
- `When the user makes {int} rapid requests`
- `When the user enters a large string of {int} characters in the first input field`

### **Then Steps** (Assertions)
- `Then the page should load successfully`
- `Then the homepage should be displayed`
- `Then the page should not show an error`
- `Then the page content should be visible`
- `Then at least one button should be present`
- `Then clickable elements should be interactive`
- `Then the page should be responsive`
- `Then the page should load within {int} seconds`
- `Then a {int} error should be returned`
- `Then the page should not crash`
- `Then no sensitive data should be in the console`
- `Then all CSS and JS resources should load successfully`
- `Then the page URL should contain {string}`
- `Then the page title should be {string}`
- `Then the response status should be less than {int}`
- `Then the response status should be greater than or equal to {int}`
- `Then the page should have at least {int} visible elements`
- `Then the page should not have console errors`
- `Then most of the rapid requests should succeed`
- `Then the page should contain text {string}`
- `Then the page should not contain text {string}`

## 🏛️ Page Object Model Classes

### **BasePage.ts** - Base Class
Provides common functionality:
- Navigation: `navigateTo()`, `goBack()`, `goForward()`
- Page interaction: `clickElement()`, `fillText()`, `hoverElement()`
- Element queries: `getText()`, `isElementVisible()`, `countElements()`
- Page state: `getPageURL()`, `getPageTitle()`, `getPageContent()`
- Performance: `measurePageLoadTime()`, `executeScript()`
- And more...

### **EAAppPage.ts** - Application-Specific Page
Extends BasePage with EAApp-specific methods:
- Navigation: `goToHomePage()`, `accessNonExistentPage()`
- Validation: `isHomePageLoaded()`, `hasErrorContent()`
- Responsive testing: `setMobileViewport()`, `setTabletViewport()`, `setDesktopViewport()`
- Security testing: `trySQLInjection()`, `tryXSSAttack()`
- Performance testing: `getLoadTimePerformance()`, `getFailedResources()`
- And more...

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/smmalini08/PlaywrightAI.git
cd PlaywrightAI

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with Specific Tags
```bash
# Run smoke tests
npm test -- --tags "@smoke"

# Run positive tests only
npm test -- --tags "@positive"

# Run negative tests only
npm test -- --tags "@negative"

# Run security tests only
npm test -- --tags "@security"

# Run performance tests only
npm test -- --tags "@performance"

# Run mobile responsive tests
npm test -- --tags "@mobile"

# Run with multiple tags (AND condition)
npm test -- --tags "@positive and @smoke"
```

### Run Tests with Specific Browser
```bash
# Run with Firefox browser
BROWSER=firefox npm test

# Run with WebKit (Safari)
BROWSER=webkit npm test

# Run with Chromium (default)
BROWSER=chromium npm test
```

### Run Tests in Headed Mode
```bash
HEADED=true npm test
```

### Dry Run (Syntax Check)
```bash
npm run test:dry-run
```

### Generate Reports
```bash
npm run test:report
```

## 📊 Reports

After running tests, view reports:

- **HTML Report**: `test-results/cucumber-report.html`
- **JSON Results**: `test-results/cucumber-report.json`
- **JUnit XML**: `test-results/junit.xml`
- **Screenshots**: `test-results/screenshot-*.png` (on failure)

## 🎨 Gherkin Syntax Features

### Scenario Tags
Tags help organize and filter tests:
```gherkin
@smoke @positive @homepage
Scenario: Verify homepage loads successfully
```

### Parameters
Use dynamic parameters in steps:
```gherkin
When the user sets the viewport to "mobile" size
Then the page should load within 10 seconds
```

### Multiple Assertions
Chain multiple assertions:
```gherkin
Then the page should load successfully
And the homepage should be displayed
And the page should not show an error
```

## 🤖 Browser Management

### BrowserManager Utility
Handles browser lifecycle:
- Multiple browser support (Chromium, Firefox, WebKit)
- Headless/headed mode control
- Context and page management
- Automatic cleanup

Environment variables:
- `BROWSER` - Set browser type (chromium, firefox, webkit)
- `HEADED` - Set headed mode (true/false)

## 🔐 Security Testing

Tests include security scenarios for:
- SQL Injection attacks
- XSS (Cross-Site Scripting) attacks
- Sensitive data leakage
- Error message exposure

## 📈 Performance Testing

Tests verify:
- Page load time (< 10 seconds)
- CSS/JS resource loading
- Mobile/Tablet/Desktop responsiveness
- Stress testing with rapid requests

## 🐛 Debugging

### View Trace Information
```bash
npx playwright show-trace trace.zip
```

### Run Single Scenario
```bash
npm test -- --name "Verify homepage loads successfully"
```

### Verbose Output
```bash
npm test -- --format progress-bar
```

## 🛠️ Troubleshooting

### Tests timeout
- Increase timeout in hooks or specific scenarios
- Check network connectivity to http://eaapp.somee.com/

### Browser not found
```bash
npx playwright install
npx playwright install-deps
```

### Permission denied errors
```bash
chmod +x node_modules/.bin/playwright
```

### Type errors
```bash
npm install -D typescript @types/node
npx tsc --init
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber)
- [Gherkin Reference](https://cucumber.io/docs/gherkin)
- [BDD Best Practices](https://cucumber.io/docs/bdd)

## 👤 Author

**smmalini08** - [GitHub Profile](https://github.com/smmalini08)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Open an issue on [GitHub Issues](https://github.com/smmalini08/PlaywrightAI/issues)
- Check existing documentation
- Review feature files for examples

---

**Last Updated**: 2026-05-19
**Framework**: Playwright + Cucumber BDD + POM
**Total Test Scenarios**: 20 (6 positive + 8 negative + 6 security/performance)
