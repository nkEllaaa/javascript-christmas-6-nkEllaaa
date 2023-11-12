import InputView from '../view/InputView';
import validateVisitDate from '../validation/validatevisitDate';
import { Console } from '@woowacourse/mission-utils';

class Controller {
  constructor() {}

  async getVisitDate() {
    const visitDate = await InputView.getVisitDate();
    try {
      console.log('방문 날짜', visitDate);
      validateVisitDate(visitDate);
      return;
    } catch (error) {
      Console.print(error.message);
    }
  }

  async getMenuAndQuantity() {
    const menuAndQuantity = await InputView.getMenuAndQuantity();
    try {
      console.log('주문 메뉴와 수량', menuAndQuantity);
      validateMenu(menuAndQuantity);
    } catch (error) {
      Console.print(error.message);
    }
  }

  formatDateTwoDigits(visitDate) {
    if (visitDate < 10) {
      return `0${visitDate}`;
    }
    return visitDate;
  }

  returnEvents() {
    return {
      christmas: false,
      weekday: false,
      weekend: false,
      special: false,
      champagne: false,
    };
  }

  formatDateToDay(twoDigitDate) {
    const formattedDate = `2023-12-${twoDigitDate}`;
    const visitDay = new Date(formattedDate).getDay();
    return visitDay;
  }
}
export default Controller;
