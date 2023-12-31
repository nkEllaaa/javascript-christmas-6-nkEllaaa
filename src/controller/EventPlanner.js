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
      validateVisitDate(visitDateNumber);
      return visitDateNumber;
    } catch (error) {
      Console.print(error.message);
      return await this.getVisitDate();
    }
  }

  async getOrderMenu() {
    const orderMenuArray = await InputView.getOrderMenu();
    try {
      validateMenu(orderMenuArray);
      return orderMenuArray;
    } catch (error) {
      Console.print(error.message);
      return await this.getOrderMenu();
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

  printTotalDiscountList(discountAmount, eventList) {
    Object.entries(discountAmount).forEach(([eventName, discount]) => {
      if (eventList[eventName]) {
        const formattedEventName = eventName.replace(/_/g, ' ');
        if (discount > 0) OutputView.printTotalDiscountList(formattedEventName, discount);
      }
    });
  }

  printBadge(badge) {
    OutputView.printMessage(badge);
  }
}
export default EventPlanner;
