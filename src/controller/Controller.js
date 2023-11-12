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
}
export default Controller;
