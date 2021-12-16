describe("places test", () => {
  beforeEach(() => {
    cy.login('Juanathan', 'password');
  });

  it("show places", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/places",
      { fixture: "places.json" }
    );

    cy.visit("http://localhost:3000/places");
    cy.get("[data-cy=place]".should("have.length",4));
    cy.get("[data-cy=place_name]").eq(0).contains("Banco Casino");
  });

  it("very slow response", () => {
    cy.intercept(
      "http://localhost:9000/api/places",
      (req) => {
        req.on("response", (res) => {
          res.setDelay(1000);
        });
      }
    ).as("slowResponse");
    cy.visit("http://localhost:3000/places");
    cy.get("[data-cy=loading]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loading]").should("not.exist");
  });

  it("check filter", () => {
    cy.visit("http://localhost:3000/places");
    cy.get("[data-cy=places_search_input]").type("Pok");
    cy.get("[data-cy=places_search_btn]").click();
    cy.get("[data-cy=place]").should("have.length", 1);
    cy.get("[data-cy=place_name]").each((el, idx) => {
      expect(el[0].textContent).to.match(/Pok/);
    });
  });

  it("check empty filter", () => {
    cy.visit("http://localhost:3000/places");
    cy.get("[data-cy=places_search_input]").type("xyz");
    cy.get("[data-cy=places_search_btn]").click();
    cy.get("[data-cy=place]").should("have.length", 0);
    cy.get("[data-cy=error_message]").should("not.exist");
  });

  it("error from backend", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/places",
      { statusCode: 500, body: { error: "internal server error" } }
    );
    cy.visit("http://localhost:3000/places");
    cy.get("[data-cy=places_search_input]").type("Pok");
    cy.get("[data-cy=places_search_btn]").click();
    cy.get("[data-cy=error_message]").should("be.visible");
  });
});