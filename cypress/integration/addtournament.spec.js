describe("add tournament form", () => {
  beforeEach(() => {
    cy.login('Juanathan', 'password');
  });

  it("foutieve entrants", () => {
    cy.visit("http://localhost:3000/tournaments/add");

    cy.get("[data-cy=entrants_input").type("-2");
    cy.get("[data-cy=submit_tournament").click();

    cy.get("[data-cy=labelinput-error").should("be.visible");
    cy.get("[data-cy=labelinput-error").eq(0).contains("this is required");
    cy.get("[data-cy=labelinput-error")
      .eq(0)
      .should("contain", "this is required");
  });

  it("add tournament ", () => {
    cy.visit("http://localhost:3000/tournaments/add");

    cy.get("[data-cy=date_input]").type("2020-01-01");
    cy.get("[data-cy=entrants_input]").type("20");
    cy.get("[data-cy=finished_input]").type("1");
    cy.get("[data-cy=buyin_input]").type("20");
    cy.get("[data-cy=cashed_input]").type("200");
    cy.get("[data-cy=place_input]").select("Pokahnights");
    cy.get("[data-cy=submit_tournament]").click();

    cy.get("[data-cy=tournament_date]").eq(3).contains("01/01/2020");
    cy.get("[data-cy=tournament_place]").each((el, idx) => {
      if (idx === 3) {
        expect(el[0].textContent).to.equal("Pokahnights");
      }
    });
    cy.get("[data-cy=tournament]").should("have.length", 3);
  });

  it("remove again", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/tournaments",
      { fixture: "tournaments.json" }
    );

    cy.get("[data-cy=tournament_remove_btn").eq(2).click();
    cy.get("[data-cy=tournament]").should("have.length", 2);
  });
});