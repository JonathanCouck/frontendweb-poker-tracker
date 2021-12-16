describe("tournaments test", () => {
  beforeEach(() => {
    cy.login('Juanathan', 'password');
  });

  it("show cashgames", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/cashgames",
      { fixture: "cashgames.json" }
    );

    cy.visit("http://localhost:3000/cashgames");
    cy.get("[data-cy=cashgame]".should("have.length",2));
    cy.get("[data-cy=cashgame_place]").eq(0).contains("Pokahnights");
    cy.get("[data-cy=cashgame_date]").eq(0).should("contain", "2021-05-23");
  });
});