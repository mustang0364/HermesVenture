describe ('First Test', () => {
    it ('is working', () => {
      expect (true).to.equal (true);
    });
  });
  describe ('Start Test', () => {
    it ('Visit the app', () => {
      cy.visit ('localhost:3000/');
    });
  });
  describe ('FP Test', () => {
      it ('Contains Rand Item', () => {
          cy.visit('localhost:3000/');
          cy.get('.feat').contains('FEAT');
      } )
  })