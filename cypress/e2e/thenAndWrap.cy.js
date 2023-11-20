/// <reference types = "cypress"/>


describe('Our first test suite', () => {

    it.only('Then and Wrap', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm =>{
            const emailLableFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLableFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLableFirst).to.equal('Email')
            expect(passwordLableFirst).to.equal('Password')
            
            cy.contains('nb-card', 'Basic form').then(secondForm =>{
                const passwordLablePassword = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLableFirst).to.equal(passwordLablePassword)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })
        })

    })

})