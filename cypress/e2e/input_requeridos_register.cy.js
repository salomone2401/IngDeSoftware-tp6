describe('Required Fields Test', () => {
    it('should display validation errors when required fields are missing', () => {
      cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
  
      cy.get('#signup').click();
  
      cy.url().should('include', '/addUser');
      cy.contains('Add User').should('be.visible');
  
      // Dejar todos los campos vacíos y tratar de enviar el formulario
      cy.get('#submit').click();
  
      // Verificar que se muestre el mensaje de error general
      cy.contains('User validation failed:').should('be.visible');
      cy.contains('Path `firstName` is required').should('be.visible');
      cy.contains('Path `lastName` is required').should('be.visible');
      cy.contains('Email is invalid').should('be.visible');
      cy.contains('Path `password` is required').should('be.visible');
    });
  });
  