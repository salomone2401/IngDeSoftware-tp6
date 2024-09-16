describe("wrong email format", () => {
  it("passes", () => {
    cy.visit("https://thinking-tester-contact-list.herokuapp.com/");
    cy.get("#signup").click();

    cy.url().should("include", "/addUser");
    cy.contains("Add User").should("be.visible");

    cy.get("#firstName").type("Lisandro");
    cy.get("#lastName").type("Andia");
    cy.get("#email").type("lisandro@gmail");
    cy.get("#password").type("contraseña12345");

    cy.intercept("POST", "/users").as("postUser");

    cy.intercept("POST", "/users", {
      statusCode: 400, // Código de error
      body: {
        message: "User validation failed: email: Email is invalid",
      },
    }).as("postUser");

    cy.get("#submit").click();

    cy.wait("@postUser");

    // Verificar que la URL no cambie y que el mensaje de error aparezca
    cy.url().should("include", "/addUser");
    cy.contains("User validation failed: email: Email is invalid").should(
      "be.visible"
    );
  });
});
