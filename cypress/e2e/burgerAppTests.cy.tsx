// cypress\e2e\burgerAppTests.cy.tsx

/// <reference types="cypress" />

describe('Burger Application', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients').as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', 'fake-access-token');
      win.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });
    cy.setCookie('accessToken', 'fake-access-token');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Burger Constructor', () => {
    it('should add ingredients to the constructor using the add button', () => {
      cy.get('[data-cy="ingredient"]').should('exist');
      cy.get('[data-cy="ingredient"]').first().as('bun');
      cy.get('@bun').find('button').contains('Добавить').click({ force: true });

      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');

      cy.get('[data-cy="ingredient"]').should('exist');
      cy.get('[data-cy="ingredient"]').eq(2).as('main');
      cy.get('@main')
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Выберите начинку').should('not.exist');
    });

    describe('Ingredients', () => {
      it('should fetch and display ingredients', () => {
        cy.get('[data-cy="ingredient"]').should('have.length.greaterThan', 0);
      });

      it('should display ingredient details on click', () => {
        cy.get('[data-cy="ingredient"]').first().click();
        cy.url().should('include', '/ingredients/');
        cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-test="ingredient-details"]').within(() => {
          cy.get('h3').should('exist');
          cy.get('img').should('exist');
          cy.get('ul').within(() => {
            cy.get('li').should('have.length', 4);
          });
        });
      });

      it('should close the ingredient details modal on click of the close button', () => {
        cy.get('[data-cy="ingredient"]').first().click();
        cy.url().should('include', '/ingredients/');
        cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="modal-close-button"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');
        cy.url().should('not.include', '/ingredients/');
      });

      it('should close the ingredient details modal on click of the overlay', () => {
        cy.get('[data-cy="ingredient"]').first().click();
        cy.url().should('include', '/ingredients/');
        cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy="modal-overlay"]').click({ force: true });
        cy.get('[data-cy="modal"]').should('not.exist');
        cy.url().should('not.include', '/ingredients/');
      });
    });
  });

  describe('Order Creation', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/auth/login', { fixture: 'auth.json' }).as(
        'loginRequest'
      );
      cy.visit('/');
      cy.window().then((win) => {
        win.localStorage.setItem('accessToken', 'fake-access-token');
        win.localStorage.setItem('refreshToken', 'fake-refresh-token');
      });
      cy.setCookie('accessToken', 'fake-access-token');
      cy.visit('/');
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('should create an order successfully', () => {
      cy.get('[data-cy="ingredient"]')
        .first()
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.get('[data-cy="ingredient"]')
        .eq(1)
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Оформить заказ').click();
      cy.url().should('include', '/login');
      cy.get('[data-cy="login-email-input"]').type('qwe123@qwesa.com');
      cy.get('[data-cy="login-password-input"]').type('qweqwe123');
      cy.get('[data-cy="login-submit-button"]').click();
      cy.wait('@loginRequest').then((interception) => {
        if (interception.response && interception.response.body) {
          const { accessToken, refreshToken } = interception.response.body;
          cy.window().then((win) => {
            win.localStorage.setItem('accessToken', accessToken);
            win.localStorage.setItem('refreshToken', refreshToken);
          });
          cy.setCookie('accessToken', accessToken);
          cy.url().should('include', '/');
        } else {
          throw new Error('Login request did not return a valid response');
        }
      });

      cy.get('[data-cy="ingredient"]')
        .first()
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.get('[data-cy="ingredient"]')
        .eq(1)
        .find('button')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Оформить заказ').click();
      cy.intercept('POST', '**/api/orders').as('createOrder');
      cy.wait('@createOrder').then((interception) => {
        if (interception.response && interception.response.body) {
          const orderNumber = interception.response.body.order.number;

          cy.get('[data-cy="modal"]').should('exist');
          cy.get('[data-cy="order-number"]', { timeout: 10000 }).should(
            'be.visible'
          );
          cy.get('[data-cy="order-number"]').should(
            'contain.text',
            orderNumber.toString()
          );

          cy.get('[data-cy="modal"]')
            .first()
            .within(() => {
              cy.get('[data-cy="order-details"]').should('exist');
              cy.get('[data-cy="order-number"]').should(
                'contain.text',
                orderNumber.toString()
              );
            });

          cy.get('[data-cy="modal"]')
            .find('[data-cy="modal-close-button"]')
            .click();
          cy.get('[data-cy="modal"]').should('not.exist');
          cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
          cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
          cy.get('[data-cy="ingredient-mid"]').should('not.exist');
        } else {
          throw new Error(
            'Order creation request did not return a valid response'
          );
        }
      });
    });
  });
});
