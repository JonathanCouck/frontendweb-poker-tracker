describe("tests", () => {
	it("de applicatie draait", () => {
		cy.visit("http://localhost:3000");
		cy.get("h1").should("exist");
	});

	it("should login", () => {
		cy.login('Juanathan', 'password');
	});
});