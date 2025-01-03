# Dockerized Playwright Typescript Github Action showcase

## **Introduction**

This project is a test automation framework built using **Playwright** for UI testing. The framework leverages the **Page Object Model (POM)** and **Fixtures** to ensure maintainability and readability of the test scripts.

- **Page Object Model**: Encapsulates page-specific locators and methods in reusable classes to decouple the test logic from UI details.
- **Fixtures**: Provides reusable components for setting up and tearing down test environments, making the framework more modular and manageable.

This project is containerized using **Docker** to ensure consistent environments across all systems. It also includes a **CI/CD pipeline** using GitHub Actions for automated test execution.

---

## **Project Folder Structure**

```plaintext
.
├── docker-compose.yml         # Docker Compose configuration file
├── fixtures
│   └── basePages.ts           # Contains shared setup and reusable fixtures
├── pages
│   └── homePages.ts           # Page Object Model for the Home Page
├── tests
│   └── homePage.spec.ts       # Test file for Home Page functionality
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration file
└── README.md                  # Documentation
```

---

## **Technologies Used**

- **Playwright**: End-to-end testing framework for modern web applications.
- **TypeScript**: Strongly-typed language for maintainable and scalable code.
- **Docker**: Containerization to ensure consistent environments.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.
- **Page Object Model (POM)**: Improves test maintainability and scalability.
- **Fixtures**: Reusable test setup and teardown utilities.

---

## **Setup Instructions**

### **Prerequisites**
- Install **Docker** on your local machine. You can download it from the official Docker website:  
  [Get Docker](https://www.docker.com/get-started)

- Install **Node.js** (if running tests locally without Docker). You can download it from the official Node.js website:  
  [Download Node.js](https://nodejs.org)

---

### **How to Initialize the Project**

1. Clone the repository:
   ```bash
   git clone https://github.com/tiksang16/dockerized-playwright-typescript-github-action-showcase.git
   cd dockerized-playwright-typescript-github-action-showcase
   ```
2. Install dependencies (for local execution):
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## **How to Run Tests**

### **Using Docker (Recommended)**

1. Build and run the tests using Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. Test results will be generated in the test-results folder.
3. After the tests complete, stop the Docker containers:
   ```bash
   docker-compose down
   ```

### **Running Locally**

1. Run the tests directly using Playwright:
   ```bash
   npx playwright test
   ```
2. For a specific test file:
    ```bash
   npx playwright test tests/homePage.spec.ts
   ```
3. Generate an HTML report:
   ```bash
   npx playwright show-report test-results
   ```

---

## **CI/CD Pipeline**

The project uses **GitHub Actions** for CI/CD to automate the test execution process. The pipeline performs the following steps:

1. **Checkout the Code**:
   Pulls the latest code from the repository.

2. **Set Up Dependencies**:
   Installs Node.js, Playwright, and project dependencies.

3. **Run Tests in Docker**:
   Executes the tests in a containerized environment using Docker Compose.

4. **Upload Test Results**:
   Uploads test reports as artifacts for debugging and analysis.

---

## **Folder Structure Details**

### **1. `pages/`: Page Object Models**
This folder contains reusable classes that represent individual pages of the application. Each class encapsulates:
- Locators for UI elements.
- Methods to interact with these elements.

**Example: `homePages.ts`**
```typescript
import { Page } from '@playwright/test';

export default class homePage {
  constructor(private page: Page) {}

  async navigateToHomePage() {
    await this.page.goto('https://example.com');
  }

  async clickLoginButton() {
    await this.page.click('text=Login');
  }
}
```

### **2. `fixtures/`: Reusable Fixtures**
The fixtures/ folder defines reusable setups for tests. These fixtures ensure a consistent test environment.

**Example: `basePages.ts`**
```typescript
import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/homePages';

type Fixtures = {
  homePage: HomePage;
};

export const test = baseTest.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
```

### **3. `tests/`: Test Files**
This folder contains the test scripts. Each test file corresponds to specific functionality or features of the application.

**Example: `homePage.spec.ts`**
```typescript
import { test } from '../fixtures/basePages';

test('Verify Login Button on Home Page', async ({ homePage }) => {
  await homePage.navigateToHomePage();
  await homePage.clickLoginButton();
});
```

### **4. docker-compose.yml**
This file defines the Docker configuration for running tests in a containerized environment.

---

## **Key Features**

1. **Page Object Model (POM)**:
   - Decouples test scripts from UI details.
   - Ensures scalability and maintainability of the framework.

2. **Fixtures**:
   - Reusable test setups for consistent environments.
   - Simplifies managing dependencies like page objects and test data.

3. **Dockerized Tests**:
   - Ensures consistent environments for local and CI/CD pipelines.
   - Easy to set up and run on any machine.

4. **CI/CD Pipeline**:
   - Automates testing with GitHub Actions.
   - Provides quick feedback for pull requests and code changes.