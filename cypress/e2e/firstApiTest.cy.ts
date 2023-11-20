/// <reference types="cypress" />

describe("Test with backedn", () => {
  beforeEach("Log In", () => {
    cy.intercept("GET", "https://api.realworld.io/api/tags", {
      fixture: "tags.json",
    });
    cy.logInToApplication();
  });

  it("shoud log in", () => {
    cy.log("Sucessfull log in");
  });

  // it.only("Verify correct request and response", () => {
  //   cy.intercept("POST", "https://api.realworld.io/api/articles/").as(
  //     "postArticles"
  //   );

  //   cy.contains("New Article").click();
  //   cy.get('[placeholder="Article Title"]').type("This is the title675");
  //   cy.get('[formcontrolname="description"]').type("This is a description");
  //   cy.get('[formcontrolname="body"]').type("This is a body of the article");
  //   cy.contains("Publish Article").click();

  //   cy.wait("@postArticles").then((xhr) => {
  //     expect(xhr.response.statusCode).to.equal(201);
  //     expect(xhr.request.body.article.body).to.equal(
  //       "This is a body of the article"
  //     );
  //     expect(xhr.response.body.article.description).to.eq(
  //       "This is a description"
  //     );
  //     console.log(xhr);
  //   });
  // });

  it("mock API data", () => {
    cy.log("we logged in");
    cy.get(".tag-list")
      .should("contain", "cypress")
      .and("contain", "automation")
      .and("contain", "testing");
  });

  it.only('verify global feed likes count', ()=>{
    cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', {"articles":[],"articlesCount":0})
    cy.intercept('GET', 'https://api.realworld.io/api/articles*', {fixture: 'articles.json'})
    cy.contains('Global Feed').click()
    cy.get('app-article-list button').then(heartList =>{
      expect(heartList[0]).to.contain(1)
      expect(heartList[1]).to.contain(5)
    })

    cy.fixture('articles').then(file =>{
      const articleLink = file.articles[1].slug
      file.articles[1].favoritesCount = 66
      cy.intercept('POST', 'https://api.realworld.io/api/articles/'+ articleLink +'/favorite', file)
    })


    cy.get('app-article-list button').eq(1).click().should('contain','5')

  })
});
