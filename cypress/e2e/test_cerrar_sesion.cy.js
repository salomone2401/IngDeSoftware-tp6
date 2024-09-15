describe('User Logout Test', () => {
    it('should log out the user and navigate to the login page', () => {
      // Paso 1: Visitar la aplicación
      cy.visit('https://thinking-tester-contact-list.herokuapp.com/');
      
      // Paso 2: Simular el inicio de sesión
      // Aquí vamos a simular una solicitud de inicio de sesión
      cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users/login', {
        email: 'tu-email@example.com',
        password: 'tu-contraseña'
      }).then((response) => {
        const token = response.body.token; // Guarda el token
        
        // Paso 3: Verificar que el usuario haya iniciado sesión
        cy.url().should('include', '/dashboard');
        
        // Paso 4: Interceptar la solicitud de logout con el token
        cy.intercept('POST', 'https://thinking-tester-contact-list.herokuapp.com/users/logout', (req) => {
          req.headers['Authorization'] = Bearer ${token}; // Inserta el token real
        }).as('postLogout');
        
        // Paso 5: Realizar el cierre de sesión
        cy.get('#logoutButton').click();
        
        // Paso 6: Esperar a que se envíe la solicitud de logout y verificar el código de respuesta
        cy.wait('@postLogout').then((interception) => {
          expect(interception.response.statusCode).to.equal(200); // Verifica que el código de estado sea 200
        });
        
        // Paso 7: Verificar la redirección a la página de login
        cy.url().should('include', '/users/login');
        cy.contains('Login').should('be.visible');
      });
    });
  });