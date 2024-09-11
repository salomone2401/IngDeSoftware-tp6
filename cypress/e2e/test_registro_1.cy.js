describe('User Registration Test', () => {
  it('should register a new user and navigate to the contact list', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')

    cy.get('#signup').click()

    cy.url().should('include', '/addUser')
    cy.contains('Add User').should('be.visible')

    cy.get('#firstName').type('ana')
    cy.get('#lastName').type('paula')
    cy.get('#email').type('anapau@gmail.com')
    cy.get('#password').type('contraseña12345')

    cy.intercept('POST', '/users').as('postUser')

    cy.get('#submit').click()

    cy.wait('@postUser').then((interception) => {
      expect(interception.response.statusCode).to.equal(201)

      cy.url().should('include', '/contactList')
      cy.contains('Contact List').should('be.visible')
    })
  })
})
