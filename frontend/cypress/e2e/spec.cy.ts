describe('App', () => {
  beforeEach(() => {
    //Cleaning the database
    cy.visit('http://localhost:3000/')
    // To make sure we have at least one book
    cy.get('input').type("1984")
    cy.get('button').contains("Enter").click()
  })

  it('can insert a book', () => {
    cy.get('input').type("1984")
    cy.get('button').contains("Enter").click()
    cy.get("h2").contains("To read").parent().get("ul").should("have.length", 1)
  })

  it('can not insert repeated books', () => {
    cy.get("input").type("1984")
    cy.get("button").contains("Enter").click()
    cy.wait(1000)
    cy.get("p").contains("Book already exists").should("exist")
  })

  it("can delete a book", () => {
    cy.get("li").contains("1984").parent().parent().contains("Delete").click()
    cy.get("ul").contains("To read").should("have.length", 0)
  })

  it("can mark a book as read", () => {
    cy.get("h2").contains("To read").parent().parent().parent().should("have.length", 1)
    cy.get("button").contains("Mark as completed").click()
    cy.get("h2").contains("To read").parent().find('ul').should("have.length", 0)
    cy.get("h2").contains("In progress").parent().find('ul').should("have.length", 0)
    cy.get("h2").contains("Completed").parent().find('ul').should("have.length", 1)
  })

  after(() => {
    cy.get("button").contains("Delete").click()
  })

})