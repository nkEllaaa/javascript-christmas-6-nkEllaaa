import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import validateVisitDate from '../validation/validatevisitDate';
import validateMenu from '../validation/validateMenu';
import MESSAGES from '../constants/messages';
import { Console } from '@woowacourse/mission-utils';

class EventPlanner {
  async getVisitDate() {
    const visitDateNumber = await InputView.getVisitDate();
    try {
      console.log('방문 날짜', visitDateNumber);
      validateVisitDate(visitDateNumber);
      return visitDateNumber;
    } catch (error) {
      Console.print(error.message);
    }
  }

  async getOrderMenu() {
    const orderMenuArray = await InputView.getOrderMenu();
    try {
      console.log('주문 메뉴와 수량', orderMenuArray);
      validateMenu(orderMenuArray);
      return orderMenuArray;
    } catch (error) {
      Console.print(error.message);
    }
  }
  printNothing() {
    OutputView.printMessage(MESSAGES.nothing);
  }

  printWelcome() {
    OutputView.printMessage(MESSAGES.welcome);
  }

  printDiscountForDate(visitDate) {
    OutputView.printDiscountForDate(visitDate);
  }

  printTitleOrderMenu() {
    OutputView.printTitle(MESSAGES.menu);
  }

  printTitleTotalPrice() {
    OutputView.printTitle(MESSAGES.totalPriceBeforeDiscount);
  }

  printTitleChampagne() {
    OutputView.printTitle(MESSAGES.bonusMenu);
  }

  printTitleTotalDiscount() {
    OutputView.printTitle(MESSAGES.benefitLists);
  }

  printTitleExpectedPrice() {
    OutputView.printTitle(MESSAGES.totalDiscountCost);
  }

  printTitleTotalPriceAfterDiscount() {
    OutputView.printTitle(MESSAGES.expectedCostAfterDiscount);
  }

  printTitleDiscountList() {
    OutputView.printTitle(MESSAGES.expectedCostAfterDiscount);
  }

  printTitleBadge() {
    OutputView.printTitle(MESSAGES.badge);
  }

  printPrice(price) {
    OutputView.printPrice(price);
  }

  printDiscount(discount) {
    OutputView.printTotalDiscountAmount(discount);
  }

  printOrderMenu(orderMenus) {
    orderMenus.forEach(({ name, count }) => {
      OutputView.printMenuAndCount(name, count);
    });
  }

  printChamphagne() {
    OutputView.printMenuAndCount('샴페인', 1);
  }

  printTotalDiscountList(discountAmount) {
    discountAmount.forEach(() => {
      OutputView.printTotalDiscountList(discountAmount.key, discountAmount.value);
    });
  }

  printBadge(badge) {
    OutputView.printMessage(badge);
  }
}
export default EventPlanner;
