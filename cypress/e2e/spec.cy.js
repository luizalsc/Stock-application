describe('Stock App tests', () => {
  it('successfully loads the Homepage', () => {
    cy.visit('http://localhost:3000/Stock-application')
    cy.title().should('eq', 'Stock App')
    cy.get("input[placeholder='SIGLA']").type('TSLA')
    cy.get("button[type='submit']").click()
    cy.contains('TSLA')
    cy.contains('Preço da ação')
  })

  it('successfully loads the Stock PortFolio at Homepage', () => {
    cy.visit('http://localhost:3000/Stock-application')
    cy.get("input[placeholder='SIGLA']").type('TSLA')
    cy.get("button[type='submit']").click()
    cy.get("button[value='TSLA']").click()
    cy.contains('TSLA - MOTOR VEHICLES & PASSENGER CAR BODIES')
  })

  it('successfully redirects the user to Portfolio page', () => {
    cy.visit('http://localhost:3000/Stock-application')
    cy.get('.link').click()
    cy.url().should('include', '/portifolio/')
    cy.contains('Voltar')
    cy.contains('Monte sua aplicação')
    cy.contains('Ações escolhidas')
    cy.contains('Compra sugerida')
  })

  it('successfully loads the user choices at Wallet and Calculator', () => {
    cy.visit('http://localhost:3000/Stock-application')
    cy.get("input[placeholder='SIGLA']").type('TSLA')
    cy.get("button[type='submit']").click()
    cy.get("button[value='TSLA']").click()
    cy.get('.link').click()
    cy.get('select').select(1)
    cy.get('input#number').type('100')
    cy.get("button[type='reset']").click()
    cy.get("input[name='amount']").type('10000')
    cy.get("button[type='submit']").click()
    cy.contains('TSLA - 100%')
    cy.contains('Você deve comprar:')
    cy.contains('ações da TSLA')
  })
})
