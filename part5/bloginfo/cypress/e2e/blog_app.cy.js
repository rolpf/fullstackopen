describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "pedro pascal",
      username: "pedropascal",
      password: "1234pedro",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("My blog");
    //cy.contains("async/await simplifies making async calls");
  });

  it("login form is shown", function () {
    cy.contains("log in").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("pedropascal");
      cy.get("#password").type("1234pedro");
      cy.get("#login-button").click();
      cy.contains("connected user : pedropascal");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("oxor");
      cy.get("#password").type("oxor");
      cy.get("#login-button").click();
      cy.get(".error")
        .contains("wrong username or password")
        .and("have.class", "text-red-900");
    });
  });
});
