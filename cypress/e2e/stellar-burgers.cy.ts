describe('проверка работы страницы конструктора бургера', function() {
  const modalClose = '#modals button[aria-label="Закрыть"]';
  const orderNumber = '[data-cy=order-number';
  const bulka1 = '[data-cy=643d69a5c3f7b9001cfa093c]';

  beforeEach(function () {
    cy.intercept('GET', 'api/ingredietns', {fixture: 'ingredients.json'}).as('ing')
    cy.intercept('POST', 'api/orders', {fixture: 'feed.json'})
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'})
    cy.setCookie('accessToken', 'mockAccessToken')
    localStorage.setItem('refreshToken', 'mockRefreshToken')
    cy.viewport(1300, 800);
    cy.visit('/');
  })
  
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it('Проверка открытия и закрытия модального окна по клику', function() {
    cy.get(bulka1).click()
    cy.get(modalClose).click();
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('Проверка открытия и закрытия модального окна по клику на оверлей', function() {
    cy.get(bulka1).click()
    cy.get('[data-cy=overlay]').click('left', {force: true});
    cy.contains('Детали ингредиента').should('not.exist')
  })

  it('проверка создания заказа', function() {

   
    cy.get(bulka1).contains('Добавить').click()
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').contains('Добавить').click()
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').contains('Добавить').click()
    cy.get('[data-cy=order-summ] button').click()

    cy.get(orderNumber).contains('48843').should('exist')

    cy.get(modalClose).click();
    cy.get(orderNumber).should('not.exist')

    cy.get('div').contains('Выберите булки').should('exist')
    cy.get('div').contains('Выберите начинку').should('exist')
  });
});