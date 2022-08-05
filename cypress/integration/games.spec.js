describe('games test', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '/api/games/user/*',
      // { fixture: 'games.json'}
    ).as('get_games');

    cy.login('Juanathan', 'Juanathan');
    cy.wait('@get_games')
  });

  it('show games', () => {
		cy.get('[data-cy=game]').should('have.length', 4);
    cy.get('[data-cy=game_index]').eq(0).should('contain','1');
    cy.get('[data-cy=game_place]').eq(0).should('contain','PokahNights');
    cy.get('[data-cy=game_date]').eq(0).should('contain','07/06/2022');
  });

  it('add game', () => {
    cy.get('[data-cy=add_game]').click();
    cy.url().should('eq', 'http://localhost:3000/games/add');

    cy.get('[data-cy=place_input]').select('Banco Casino');
    cy.get('[data-cy=type_input]').select('CASH');
    cy.get('[data-cy=inFor_input]').type('100');
    cy.get('[data-cy=outFor_input]').type('605');
    cy.get('[data-cy=par1_input]').type('1');
    cy.get('[data-cy=par2_input]').type('2');
    cy.get('[data-cy=date_input]').type('2022-08-05');

    cy.get('[data-cy=submit_btn]').click();
    cy.url().should('eq', 'http://localhost:3000/games');
    cy.get('[data-cy=game]').should('have.length', 5);

    cy.get('[data-cy=game_place]').eq(4).should('contain','Banco Casino');
    cy.get('[data-cy=game_type]').eq(4).should('contain','CASH');
    cy.get('[data-cy=game_inFor]').eq(4).should('contain','100');
    cy.get('[data-cy=game_outFor]').eq(4).should('contain','605');
    cy.get('[data-cy=game_par1_tour]').eq(4).should('contain','-');
    cy.get('[data-cy=game_par2_cash]').eq(4).should('contain','1 / 2');
    cy.get('[data-cy=game_date]').eq(4).should('contain','05/08/2022');
  });

  it('edit game', () => {
    cy.get('[data-cy=game_edit_btn]').eq(4).click();
    cy.url().should('contain', '/games/edit/');

    cy.get('[data-cy=place_input]').select('Banco Casino');
    cy.get('[data-cy=type_input]').select('TOUR');
    cy.get('[data-cy=inFor_input]').clear().type('20');
    cy.get('[data-cy=outFor_input]').clear().type('0');
    cy.get('[data-cy=par1_input]').clear().type('57');
    cy.get('[data-cy=par2_input]').clear().type('84');
    cy.get('[data-cy=date_input]').clear().type('2022-08-04');

    cy.get('[data-cy=submit_btn]').click();
    cy.url().should('eq', 'http://localhost:3000/games');

    cy.get('[data-cy=game_place]').eq(4).should('contain','Banco Casino');
    cy.get('[data-cy=game_type]').eq(4).should('contain','TOUR');
    cy.get('[data-cy=game_inFor]').eq(4).should('contain','20');
    cy.get('[data-cy=game_outFor]').eq(4).should('contain','0');
    cy.get('[data-cy=game_par1_tour]').eq(4).should('contain','57 / 84');
    cy.get('[data-cy=game_par2_cash]').eq(4).should('contain','-');
    cy.get('[data-cy=game_date]').eq(4).should('contain','04/08/2022');
  });

  it('delete game', () => {
    cy.get('[data-cy=game_delete_btn').eq(4).click();
    cy.url().should('eq', 'http://localhost:3000/games');
    cy.get('[data-cy=game]').should('have.length', 4);
  })
});