describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Adeleye',
      username: 'ademide',
      password: 'haute',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('success with correct credentials', function () {
      cy.get('#username').type('ademide')
      cy.get('#password').type('haute')
      cy.get('#login-btn').click()

      cy.contains('Adeleye, You are logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ademide')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('#alert')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Adeleye, You are logged in')
      cy.get('html').should('not.contain', 'logout')
    })
  })
})
