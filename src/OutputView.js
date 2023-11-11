import { Console } from '@woowacourse/mission-utils';

export default OutputView = {
  printWelcom() {
    Console.print('<안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.>');
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },

  printTotalCostBeforeDiscount() {
    Console.print('<할인 전 총주문 금액>');
  },

  printBonusMenu() {
    Console.print('<증정 메뉴>');
  },

  printBenefitLists() {
    Console.print('<혜택 내역>');
  },

  printTotalDiscountCost() {
    Console.print('총혜택 금액');
  },

  printExpectedCostAfterDiscount() {
    Console.print('<할인 후 예상 결제 금액>');
  },

  printEventBadge() {
    Console.print('<12월 이벤트 배지>');
  },
};
