# 🛒 SauceDemo Automated E2E Testing Framework

An automated End-to-End (E2E) testing framework for the **Swag Labs** e-commerce website ([SauceDemo.com](https://www.saucedemo.com/)), built with **Playwright** and **TypeScript**. 

This project demonstrates a robust testing architecture using the **Page Object Model (POM)** design pattern to ensure maintainability, scalability, and readability.

## 🚀 Key Features

* **Page Object Model (POM):** structured design to separate test logic from page details.
* **End-to-End Scenarios:** Covers the full user journey from Login -> Shopping -> Checkout.
* **Complex Logic Validation:** Includes automated tax calculation (8% tax) and item total verification.
* **Negative Testing:** Validates error messages for login failures and empty form submissions.
* **State Management:** Verifies cart state (empty/not empty) and persistence across pages.
* **Cross-Browser Support:** Ready to run on Chromium, Firefox, and WebKit.

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Framework:** [Playwright](https://playwright.dev/)
* **Runtime:** Node.js
* **Version Control:** Git

## 📂 Project Structure

```text
├── pages/                  # Page Object Models (POM)
│   ├── LoginPage.ts        # Locators & Methods for Login
│   ├── InventoryPage.ts    # Product catalog interactions
│   ├── CartPage.ts         # Cart management
│   └── CheckoutPage.ts     # Checkout forms & logic
├── tests/                  # Test Suites
│   ├── Login.spec.ts       # Authentication scenarios
│   ├── Inventory.spec.ts   # Sorting & Adding items
│   ├── Cart.spec.ts        # Cart verification
│   └── Checkout.spec.ts    # E2E Flow & Calculations
├── playwright.config.ts    # Framework Configuration
├── package.json            # Dependencies
└── README.md               # Project Documentation
```

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git](https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git)

2. **Install dependencies**
    ```bash
    npm install

3. **Install Playwright Browsers**
    ```bash
    npx playwright install

## 🏃‍♂️ How to Run Tests

**Run all tests (Headless mode):**
```bash
npx playwright test
```

**Run tests with UI (See the browser action):**
```bash
npx playwright test --headed
```

**Run specific test file:**
```bash
npx playwright test tests/Checkout.spec.ts
```

**View HTML Report:**
```bash
npx playwright show-report
```

##🧪 Test Scenarios Covered
**1. Authentication (Login.spec.ts)**
✅ Login with valid credentials (Standard User).

✅ Login with invalid password (Error validation).

✅ Locked-out user validation.

**2. Inventory & Product Management (Inventory.spec.ts)**
✅ Product sorting (Price: Low-High, High-Low, Name: A-Z, Z-A).

✅ Adding/Removing items.

✅ Cart badge validation.

**3. Cart Functionality (Cart.spec.ts)**
✅ Verify items persistence.

✅ Empty cart validation.

**4. Checkout & Logic (Checkout.spec.ts)**
✅ E2E Purchase Flow.

✅ Tax Calculation Logic: Item Total + Tax (8%) = Grand Total.

✅ Form Validation errors.
