describe('User Logout Test', () => {
    it('should log in the user and navigate to the contact list page', () => {
      cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  
      // Credenciales válidas para el test
      cy.get('#email').type('magallanesefidani@gmail.com');
      cy.get('#password').type('IngDeSoft2024');
      cy.get('#submit').click();
  
      // Espera hasta que la redirección a la página de lista de contactos esté completa
      cy.url({ timeout: 10000 }).should('include', '/contactList');
      cy.contains('Contact List', { timeout: 10000 }).should('be.visible');
      // Asegúrate de que el botón de logout esté visible y haz clic en él
      cy.get('#logout', { timeout: 10000 }).should('be.visible').click();
  
      // Verifica la redirección a la página de login
      cy.url({ timeout: 10000 }).should('include', '/logout');
    });  
  });