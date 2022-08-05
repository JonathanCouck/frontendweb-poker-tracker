describe("initial test", () => {
	it("app is running", () => {
		cy.visit('http://localhost:3000')
		cy.get("h1").should("exist");
	});
});