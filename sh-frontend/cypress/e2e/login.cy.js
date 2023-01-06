describe('The Login Page', () => {
    it('sets auth cookie when logging in via form submission', () => {
        const email = 'lexdekort@live.nl'
        const password = 'abcde'

        cy.login(email, password)
        
        cy.url().should('include', '/my-account', () => {
            expect(localStorage.getItem("jwt_access_token")).to.exist()
        })
    })
})