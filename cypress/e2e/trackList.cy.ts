describe('проверка работы страницы конструктора бургера', function() {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredietns', {fixture: 'ingredients.json'}).as('ing')
    cy.intercept('POST', 'api/orders', {fixture: 'feed.json'})
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'})
    cy.setCookie('accessToken', 'mockAccessToken')
    localStorage.setItem('refreshToken', 'mockRefreshToken')
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000')
  })
  
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('Проверка открытия и закрытия модального окна по клику', function() {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').click()
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('Проверка открытия и закрытия модального окна по клику на оверлей', function() {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').click()
    cy.get('[data-cy=overlay]').click('left', {force: true});
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('проверка создания заказа', function() {
    
    cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').contains('Добавить').click()
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click()
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click()
    cy.get('[data-cy=order-summ] button').click()

    cy.get('[data-cy=order-number]').contains('48843').should('exist')

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number').should('not.exist')

    cy.get('div').contains('Выберите булки').should('exist')
    cy.get('div').contains('Выберите начинку').should('exist')
  });
});