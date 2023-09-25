/// <reference types="cypress" />

describe('search apple', () => {
    it ('search apple', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#searchQuery').type('apple juice')
        cy.get('#mat-input-0').type("{enter}")
       //cant hit enter
       
    })
});