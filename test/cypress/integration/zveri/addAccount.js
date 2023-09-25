/// <reference types="cypress" />

     
describe('should login', () => {


    it ('login the user', () => {
        cy.visit('http://localhost:3000/#/search')
        cy.get('#navbarAccount').click()
        cy.get('#navbarLoginButton > span').click()
        cy.get('a[href="#/register"]').click()
        cy.get('#emailControl').type('asakeeva88@gmail.com')
        cy.get('#passwordControl').type('116184ASdhs')
        cy.get('#repeatPasswordControl').type('116184ASdhs')
        cy.get('.mat-select-placeholder').click()
        cy.get('#mat-option-4 > .mat-option-text').click()
        cy.get('#securityAnswerControl').type('Abdybekova')
        cy.get('button[type="submit"]').click()
       
    })

    it ('verify the new added account', () => {

        cy.visit('http://localhost:3000/')
        cy.get('#navbarAccount').click()
        cy.get('#navbarLoginButton').click()
        cy.get('#email').type('asakeeva88@gmail.com')
        cy.get('#password').type('116184ASdhs')
        cy.get('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click()
        cy.get('#navbarAccount > .mat-button-wrapper > span').click()
        cy.get('#navbarLogoutButton span').should('have.text', ' Logout ') 
    })
})