describe('Admin places test', () => {
  beforeEach(() => {
    cy.login('Juanathan', 'Juanathan');

    cy.get('[data-cy=nav_places]').click();
  });

  it('show places', () => {
		cy.get('[data-cy=place]').should('have.length', 3);
    cy.get('[data-cy=place_index]').eq(0).should('contain','1');
    cy.get('[data-cy=place_name]').eq(0).should('contain','Banco Casino');
    cy.get('[data-cy=place_country]').eq(0).should('contain','Slovakia');
  });

  it('add place', () => {
    cy.get('[data-cy=add_place]').click();
    cy.url().should('eq', 'http://localhost:3000/places/add');

    cy.get('[data-cy=name_input]').type('Kings Resort');
    cy.get('[data-cy=country_input]').type('Czech Republic');
    cy.get('[data-cy=city_input]').type('Rozvadov');
    cy.get('[data-cy=website_input]').type('https://kings-resort.com/');

    cy.get('[data-cy=submit_btn]').click();
    cy.url().should('eq', 'http://localhost:3000/places');
    cy.get('[data-cy=place]').should('have.length', 4);

    cy.get('[data-cy=place_name]').eq(2).should('contain','Kings Resort');
    cy.get('[data-cy=place_country]').eq(2).should('contain','Czech Republic');
    cy.get('[data-cy=place_city]').eq(2).should('contain','Rozvadov');
  });

  it('edit place', () => {
    cy.get('[data-cy=place_edit_btn]').eq(2).click();
    cy.url().should('contain', '/places/edit/');


    cy.get('[data-cy=name_input]').clear().type('Grand Casino Middelkerke');
    cy.get('[data-cy=country_input]').clear().type('Belgium');
    cy.get('[data-cy=city_input]').clear().type('Middelkerke');
    cy.get('[data-cy=website_input]').clear().type('https://www.grandcasinomiddelkerke.be/nl/');

    cy.get('[data-cy=submit_btn]').click();
    cy.url().should('eq', 'http://localhost:3000/places');

    cy.get('[data-cy=place_name]').eq(2).should('contain','Grand Casino Middelkerke');
    cy.get('[data-cy=place_country]').eq(2).should('contain','Belgium');
    cy.get('[data-cy=place_city]').eq(2).should('contain','Middelkerke');
  });

  it('delete place', () => {
    cy.get('[data-cy=place_delete_btn').eq(2).click();
    cy.url().should('eq', 'http://localhost:3000/places');
    cy.get('[data-cy=place]').should('have.length', 3);
  })
});

describe('Regular user places test', () => {
  beforeEach(() => {
    cy.login('Keupper', 'KeupperKeupper');

    cy.get('[data-cy=nav_places]').click();
  });

  it('show places', () => {
		cy.get('[data-cy=place]').should('have.length', 3);
    cy.get('[data-cy=place_index]').eq(0).should('contain','1');
    cy.get('[data-cy=place_name]').eq(0).should('contain','Banco Casino');
    cy.get('[data-cy=place_country]').eq(0).should('contain','Slovakia');
  });

  it('no add/edit/delete buttons', () => {
    cy.get('[data-cy=add_place]').should('not.exist');
    cy.get('[data-cy=place_edit_btn]').should('not.exist');
    cy.get('[data-cy=place_delete_btn]').should('not.exist');
  });

  it('redirect from edit/add', () => {
    cy.visit('http://localhost:3000/places/add');
    cy.url().should('eq', 'http://localhost:3000/games');

    cy.visit('http://localhost:3000/places/edit/b4b6982a-3edd-4f4d-8188-cc8063dd4ff0');
    cy.url().should('eq', 'http://localhost:3000/games');
  })
});