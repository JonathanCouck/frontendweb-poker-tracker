describe("tournaments test", () => {
  beforeEach(() => {
    cy.login('Juanathan', 'password');
  });

  it("show tournaments", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/tournaments",
      { fixture: "tournaments.json" }
    );

    cy.visit("http://localhost:3000/tournaments");
    cy.get("[data-cy=tournament]").should("have.length",2);
    cy.get("[data-cy=tournament_place]").eq(0).contains("Grand Casino de Namur");
    cy.get("[data-cy=tournament_date]").eq(0).should("contain", "17/08/2021");
  });
});