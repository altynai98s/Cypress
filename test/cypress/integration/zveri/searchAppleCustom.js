/// <reference types="cypress" />

import hr from "/Users/altynai/Desktop/juice-shop-master/test/cypress/support/pom/loginpage.js"

describe('search apple', () => {

    const login = new hr
    
    it('should login first', () => {

        login.visitthepage(data.username, data.password)
    })
    
});