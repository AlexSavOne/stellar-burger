/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('mockApiRequests', () => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  cy.intercept('GET', '/api/orders/*', { fixture: 'order.json' }).as(
    'getOrder'
  );
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
});

Cypress.Commands.add('mockAuthToken', () => {
  window.localStorage.setItem('authToken', 'mockToken');
});
