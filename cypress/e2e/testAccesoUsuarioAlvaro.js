describe('Acceso de Usuario', () => {
    beforeEach(() => {
      // Visitamos la página de login antes de cada test
      cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
    });
  
    it('debería permitir a un usuario acceder con credenciales válidas', () => {
      // Credenciales válidas para el test
      const email = 'rtata@gmail.com';
      const password = '1234567';
  
      // Llenamos el formulario de login usando el id del campo de email
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#submit').click();
  
      // Esperamos a que la redirección ocurra
      cy.url().should('include', '/contactList');
  
      // Verificamos que "Contact List" esté visible en la página
      cy.contains('Contact List').should('be.visible');
    });
  });
