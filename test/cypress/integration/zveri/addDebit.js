/// <reference types="cypress" />

describe('add a debit card', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#navbarAccount').click()
        cy.get('#navbarLoginButton').click()
        cy.get('#email').type('asakeeva88@gmail.com')
        cy.get('#password').type('116184ASdhs')
        cy.get('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click()
    });

    it ('add a debit card', () => {
       
        cy.get('#navbarAccount').click()
        cy.get('.mat-menu-content > [aria-label="Show Orders and Payment Menu"] > span').click()
        cy.get('[routerlink="/saved-payment-methods"]').click()
        cy.get('.mat-expansion-panel-header-title').click()
        cy.get('#mat-input-3').type('Altynai Sakeeva')
        cy.get('#mat-input-4').type('1234567812345678')
        cy.get('#mat-input-5').select(3)
        cy.get('#mat-input-6').select(5)
        cy.get('#submitButton > .mat-button-wrapper').click()
    })

    it('verify newly added card', () => {
       
        cy.get('#navbarAccount').click()
        cy.get('.mat-menu-content > [aria-label="Show Orders and Payment Menu"] > span').click()
        cy.get('[routerlink="/saved-payment-methods"]').click()
        cy.get('#navbarAccount').click()
        cy.get('.mat-menu-content > [aria-label="Show Orders and Payment Menu"] > span').click()
       
        // cy.title('[routerlink="/saved-payment-methods"]').should('have.text', 'Altynai Sakeeva') 
    })
});

// at real job can i always search elements in cypress ?