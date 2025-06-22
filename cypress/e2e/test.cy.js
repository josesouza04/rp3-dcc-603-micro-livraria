describe('testes de funcionalidade', () => {

  beforeEach(() => {
    // Certifique-se de que esta é a URL correta do seu aplicativo
    cy.visit('http://localhost:5000'); // <--- ALTERE PARA A URL REAL DO SEU SITE!
  });

  it('deve calcular frete com sucesso (com interceptação)', () => {
    const cepValido = '12345678'; 

    cy.intercept('GET', 'http://localhost:3000/shipping/' + cepValido).as('calculateShipping'); // Cria um alias para a requisição

    cy.get('input[placeholder="Digite o CEP"]').first().click().type(cepValido); // .first() pega o primeiro se houver múltiplos
    cy.get('a[data-id="1"]').click();

    cy.wait('@calculateShipping', { timeout: 20000 }); // Aguarda a requisição de frete ser concluída

    cy.get('.swal-icon--success__ring').should('be.visible');
    cy.get('.swal-title').should('contain', 'Frete');
    cy.get('.swal-text').should('contain', 'O frete é:');
  })
})