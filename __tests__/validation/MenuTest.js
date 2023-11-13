import validateMenu from '../../src/validation/validateMenu';

describe('주문 메뉴 테스트 ', () => {
  test('주문 메뉴 공백 테스트', () => {
    const menu = '';
    expect(() => validateMenu(menu)).toThrow('[ERROR]');
  });

  test('주문 메뉴 패턴 테스트', () => {
    const menu = ['시저샐러드:1'];
    expect(() => validateMenu(menu)).toThrow('[ERROR]');
  });

  test('주문 메뉴 존재 여부 판단 테스트', () => {
    const menu = ['초밥-1'];
    expect(() => validateMenu(menu)).toThrow('[ERROR]');
  });

  test('주문 메뉴 타입이 모두 beverage인지 테스트', () => {
    const menu = ['제로콜라-1,레드와인-1'];
    expect(() => validateMenu(menu)).toThrow('[ERROR]');
  });

  test('주문 메뉴 중복 테스트', () => {
    const menu = ['시저샐러드-1,시저샐러드-1,제로콜라-1'];
    expect(() => validateMenu(menu)).toThrow('[ERROR]');
  });

  test('옳은 주문에서 통과하는지 테스트', () => {
    const menu = ['시저샐러드-1,티본스테이크-1,제로콜라-1'];
    expect(() => validateMenu(menu));
  });
});
