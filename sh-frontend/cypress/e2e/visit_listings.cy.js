describe('The Listings Page', () => {
    it('loads listings and visits a specific listing page', () => {
        cy.visit('/')
        
        cy.visit('/listings')

        cy.get('button[cy-name=filter]').click()

        cy.contains('Nicelane').click()

        cy.url().should('include', '/listings/')
    })
})