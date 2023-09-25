class login {
    visitthepage(username,password) {
        cy.visit('http://localhost:3000/')
        cy.get('#navbarAccount').click()
        cy.get('#navbarLoginButton').click()
        cy.get('.mat-form-field-infix.ng-tns-c21-15').type("username")
        cy.get('.mat-form-field-infix.ng-tns-c21-16').type("password")
        cy.get('.mat-focus-indicator.mat-raised-button.mat-button-base.mat-primary').click()
    }
}

export default login