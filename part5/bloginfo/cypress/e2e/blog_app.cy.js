describe("Blog app", function () {
  const user = {
    name: "pedro pascal",
    username: "pedropascal",
    password: "1234pedro",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("My blog");
    //cy.contains("async/await simplifies making async calls");
  });

  it("login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("pedropascal");
      cy.get("#password").type("1234pedro");
      cy.get("#login-button").click();
      cy.contains(`connected user : ${user.username}`);
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("pedropascal");
      cy.get("#password").type("1234pedro");
      cy.get("#login-button").click();
      cy.contains(`connected user : ${user.username}`);
    });

    it("A blog can be created", function () {
      const testBlog = {
        title: "Test Title",
        author: "Test Author",
        url: "http://testblog.com",
      };
      cy.contains("write blog").click();
      cy.get("#blog-title").type(`${testBlog.title}`);
      cy.get("#blog-author").type(`${testBlog.author}`);
      cy.get("#blog-url").type(`${testBlog.url}`);
      cy.get("#create-button").click();

      cy.contains(`${testBlog.title}`);
      cy.contains(`a new blog ${testBlog.title} by ${testBlog.author} added`);
    });

    it("A blog can be liked", function () {
      const testBlog = {
        title: "Test Title",
        author: "Test Author",
        url: "http://testblog.com",
      };
      cy.contains("write blog").click();
      cy.get("#blog-title").type(`${testBlog.title}`);
      cy.get("#blog-author").type(`${testBlog.author}`);
      cy.get("#blog-url").type(`${testBlog.url}`);
      cy.get("#create-button").click();

      cy.get("#view").click();
      cy.get("#likes-button").click();
      cy.contains("1 likes");
    });

    it("A blog can be deleted by the creator of the blog", function () {
      const testBlog = {
        title: "Test Title",
        author: "Test Author",
        url: "http://testblog.com",
      };
      cy.contains("write blog").click();
      cy.get("#blog-title").type(`${testBlog.title}`);
      cy.get("#blog-author").type(`${testBlog.author}`);
      cy.get("#blog-url").type(`${testBlog.url}`);
      cy.get("#create-button").click();

      cy.get("#view").click();
      cy.get("#delete-button").click();
    });

    it("Blogs are displayed ordered by likes"), function () {};
  });
});
