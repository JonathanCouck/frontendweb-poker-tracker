describe("tests", () => {
	it("de applicatie draait", () => {
		cy.visit("http://localhost:3000");
		cy.get("h1").should("exist");
	});

	it("should login", () => {
		cy.login('Juanathan', 'password');
	});

	it("should not login", () => {
		cy.login('NotRight', 'password');
		cy.get("[data-cy=login_error]").contains("Login failed, try again!");
	});
});