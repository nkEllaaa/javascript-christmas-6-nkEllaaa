import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printTitle(title) {
    Console.print(`<${title}>`);
  },

  printMenuAndCount(menuName, menuCount) {
    Console.print(`${menuName} ${menuCount}개`);
  },

  printTotalDiscountList(eventName, discount) {
    const formatDiscount = discount.toLocaleString('ko-KR');
    Console.print(`${eventName}: -${formatDiscount}원`);
  },

  printPrice(price) {
    const formatPrice = price.toLocaleString('ko-KR');
    Console.print(`${formatPrice}원\n`);
  },

  printTotalDiscountAmount(discount) {
    const formatDiscount = discount.toLocaleString('ko-KR');
    Console.print(`-${formatDiscount}원`);
  },

  printDiscountForDate(visitDate) {
    Console.print(`12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },
};

export default OutputView;