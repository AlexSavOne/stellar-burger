// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    mockApiRequests(): Chainable<void>;
    mockAuthToken(): Chainable<void>;
  }
}
