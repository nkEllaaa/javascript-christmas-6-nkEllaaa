import Order from '../Order';
import MenuList from '../MenuList';

class EventCalculator {
  #totalPrice;
  #totalDiscountPrice;
  #eventList;
  #visitDate;
  #orderMenu;

  constructor() {
    this.#totalPrice;
    this.#totalDiscountPrice;
    this.#eventList;
    this.#visitDate;
    this.#orderMenu;
  }

  setEventList(eventList) {
    this.#eventList = eventList;
  }

  setTotalPrice(totalPrice) {
    this.#totalPrice = totalPrice;
  }

  setVisitDate(visitDate) {
    this.#visitDate = visitDate;
  }

  setOrderMenu(orderMenu) {
    this.#orderMenu = orderMenu;
  }

  // 크리스마스 이벤트 계산
  calculateChristmasEvent(visitDate) {
    const christMasDiscountAmount = visitDate - 1 * 100 + 1000;
    this.#totalDiscountPrice += christMasDiscountAmount;
  }
}

export default EventCalculator;
