describe("Blog app", function () {
  beforeEach(function () {
    cy.resetTesting();

    const user = {
      username: "testUser",
      password: "passwordTestUser",
      name: "test",
    };

    cy.createUser(user);

    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.get("button#login-button");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input#username").type("testUser");
      cy.get("input#password").type("passwordTestUser");
      cy.get("button#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("input#username").type("wrongUsername");
      cy.get("input#password").type("wrongPassword");
      cy.get("button#login-button").click();

      cy.get(".error")
        .should("contain", "wrong credentials")
        .should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "testUser",
        password: "passwordTestUser",
      };

      cy.login(user);
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("input#title").type("React patterns");
      cy.get("input#author").type("Michael Chan");
      cy.get("input#url").type("https://reactpatterns.com/");
      cy.get("button#create").click();

      cy.get("p.blogInfo").should("contain", "React patterns");
    });

    describe("When blog created", function () {
      beforeEach(function () {
        const blog = {
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
        };

        cy.createBlog(blog);
      });

      it("A blog can be liked", function () {
        cy.contains("view").click();
        cy.get("button#like").click();

        cy.get("p#likes").should("contain", "1");
      });

      it("A blog can be deleted", function () {
        cy.contains("view").click();
        cy.contains("remove").click();

        cy.get(".success")
          .should("contain", "deleted")
          .should("have.css", "color", "rgb(0, 128, 0)");
      });

      it("Another blog can't be deleted", function () {
        const user = {
          username: "anotherTestUser",
          password: "passwordTestUser",
          name: "anotherTest",
        };

        cy.createUser(user);
        cy.login(user);

        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });

      it("Blog ordered by likes", function () {
        const blog = {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        };

        cy.createBlog(blog);

        cy.get("p.blogInfo")
          .eq(0)
          .should("contain", "Go To Statement Considered Harmful");
        cy.get("p.blogInfo").eq(1).should("contain", "React patterns");
      });
    });
  });
});
