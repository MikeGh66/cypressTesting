/// <reference types = "cypress"/>

describe('Our first test suite', () => {

    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class Name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by Attribute Name and Value
        cy.get('[placeholder="Email"]')

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag Name Attribute with value
        cy.get('input[placeholder="Email"]')

        //by Two different attributes
        cy.get('[placeholder="Email"][fullwidth][type="email"]')

        //by Tag Name Attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //the Most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]')
    })
})