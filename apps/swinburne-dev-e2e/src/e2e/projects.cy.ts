describe('swinburne-dev projects', () => {
  beforeEach(() => cy.visit('/projects/jlr-configurator'));

  it('should display project title', () => {
    cy.get('h1').contains('JLR Configurator');
  });
});
