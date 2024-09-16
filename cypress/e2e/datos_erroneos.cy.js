describe('Acceso de Usuario', () => {
  beforeEach(() => {
    // Visitamos la página de login antes de cada test
    cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  });

  it('no debería permitir a un usuario acceder con credenciales inválidas', () => {
    const email = 'martincarrion@gmail.com';
    const password = '123';

    cy.get('#email').type(email);
    cy.get('#password').type(password);

    cy.intercept('POST', '/users/login').as('postUser')

    cy.intercept('POST', '/users/login', {
      statusCode: 401,  // Código de error
      body: {
        message: 'Incorrect username or password'
      }
    }).as('postUser')

    cy.get('#submit').click();

    cy.wait('@postUser').then((interception) => {
      expect(interception.response.statusCode).to.equal(401)

      cy.url().should('include', '/')
      cy.contains('Incorrect username or password').should('be.visible')
    })

  });
});