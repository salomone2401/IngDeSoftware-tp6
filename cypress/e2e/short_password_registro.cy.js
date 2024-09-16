describe('short password', () => {
  it('passes', () => {
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/')
    cy.get('#signup').click()

    cy.url().should('include', '/addUser')
    cy.contains('Add User').should('be.visible')

    cy.get('#firstName').type('nico')
    cy.get('#lastName').type('casado')
    cy.get('#email').type('nicas@gmail.com')
    cy.get('#password').type('1')

    cy.intercept('POST', '/users').as('postUser')

    cy.intercept('POST', '/users', {
      statusCode: 400,  // Código de error
      body: {
        message: 'User validation failed: password: Path `password` (`1`) is shorter than the minimum allowed length (7).'
      }
    }).as('postUser')

    cy.get('#submit').click()

    cy.wait('@postUser')

    // Verificar que la URL no cambie y que el mensaje de error aparezca
    cy.url().should('include', '/addUser')
    cy.contains('User validation failed: password: Path `password` (`1`) is shorter than the minimum allowed length (7).')
      .should('be.visible')

  })
})