# PlaywrightAI - Test Automation Suite

Comprehensive Playwright test automation framework with MCP server support for testing **http://eaapp.somee.com/**.

## 📋 Overview

This project provides automated test coverage for the EAApp application using:
- **Playwright** - Modern cross-browser testing framework
- **TypeScript** - Type-safe test code
- **MCP Servers** - Model Context Protocol integration for AI-assisted testing

## ✨ Features

- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Mobile and tablet responsive testing
- ✅ Positive and negative test cases
- ✅ HTML, JSON, and JUnit reporting
- ✅ Screenshot and video on failure
- ✅ Trace recording for debugging
- ✅ Parallel test execution
- ✅ Security testing (SQL Injection, XSS)
- ✅ Performance testing

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

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests Headed (with browser visible)
```bash
npm run test:headed
```

### Run Tests for Specific Browser
```bash
npm run test:chrome      # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari only
```

### View HTML Report
```bash
npm run test:report
```

## 📊 Test Coverage

### Positive Test Cases (6 tests)

| Test ID | Description |
|---------|-------------|
| TC001 | Verify homepage loads successfully |
| TC002 | Verify page contains expected UI elements |
| TC003 | Verify page is responsive - mobile view |
| TC004 | Verify page is responsive - tablet view |
| TC005 | Verify clickable elements are interactive |
| TC006 | Verify page content loads within acceptable time |

### Negative Test Cases (8 tests)

| Test ID | Description |
|---------|-------------|
| NC001 | Verify 404 error for non-existent page |
| NC002 | Verify SQL Injection attempt is handled |
| NC003 | Verify XSS attack prevention |
| NC004 | Verify empty form submission handling |
| NC005 | Verify handling of network timeout |
| NC006 | Verify special characters in URL are handled |
| NC007 | Verify large input string handling |
| NC008 | Verify rapid consecutive requests handling |

### Security & Performance Tests

| Test ID | Description |
|---------|-------------|
| SEC001 | Verify no sensitive data in console |
| PERF001 | Verify CSS and JS loads successfully |

## 📁 Project Structure

```
PlaywrightAI/
├── tests/
│   └── eaapp.spec.ts          # Main test suite
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── .gitignore               # Git ignore rules
├── .npmrc                   # NPM configuration
└── README.md                # This file
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The configuration includes:
- **Base URL**: http://eaapp.somee.com/
- **Browsers**: Chrome, Firefox, Safari
- **Devices**: Desktop, Mobile, Tablet
- **Reporting**: HTML, JSON, JUnit
- **Screenshots**: On failure only
- **Videos**: On failure
- **Traces**: On first retry
- **Retries**: 2 in CI, 0 locally
- **Parallel**: Enabled for local, disabled in CI

## 🔐 Security Testing

The test suite includes security tests for:
- SQL Injection attacks
- XSS (Cross-Site Scripting) attacks
- Input validation
- Special character handling
- Large input handling
- Sensitive data leakage

## 📈 Performance Testing

Tests verify:
- Page load time (< 10 seconds)
- Resource loading (CSS, JS)
- Responsive design on multiple viewports
- Rapid request handling

## 🐛 Debugging

### Enable Trace Viewer
```bash
npx playwright show-trace trace.zip
```

### Run Single Test
```bash
npx playwright test tests/eaapp.spec.ts -g "TC001"
```

### Verbose Output
```bash
npm test -- --reporter=list
```

## 📝 Environment Variables

Create `.env` file for configuration (optional):
```
BASE_URL=http://eaapp.somee.com/
TIMEOUT=30000
HEADLESS=true
```

## 🤖 MCP Server Integration

To use MCP servers with this project:

1. Install MCP SDK:
```bash
npm install @modelcontextprotocol/sdk
```

2. Configure MCP servers in your IDE or test runner

3. MCP servers can assist with:
   - Test generation
   - Test analysis
   - Locator suggestions
   - Test optimization

## 📊 Reports

After running tests, view reports:

- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/junit.xml`

## 🛠️ Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
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

### Port already in use
Kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [MCP Documentation](https://modelcontextprotocol.io)

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
- Review test cases for examples

---

**Last Updated**: 2026-05-19
**Playwright Version**: ^1.40.0
