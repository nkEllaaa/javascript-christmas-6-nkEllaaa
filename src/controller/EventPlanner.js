import InputView from '../view/InputView';
import validateVisitDate from '../validation/validatevisitDate';
import validateMenu from '../validation/validateMenu';
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
}
export default EventPlanner;