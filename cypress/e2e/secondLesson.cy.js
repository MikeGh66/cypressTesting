/// <reference types = "cypress"/>

describe('Our first test suite', () => {

    it.only('Second test', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        //give an attreibute name to select the second sign in button
        cy.contains('[status="warning"]','Sign in')


        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

})