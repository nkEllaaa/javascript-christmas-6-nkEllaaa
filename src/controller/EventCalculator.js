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

  // 주중 이벤트를 위한 디저트 개수
  getDessertCount() {
    let dessertCount = 0;
    this.#orderMenu.forEach((orderItem) => {
      const SameMenu = MenuList[orderItem.name];
      if (SameMenu) {
        dessertCount++;
      }
    });

    console.log('토탈', dessertCount);
    return dessertCount;
  }

  // 주중 이벤트 계산
  calculateWeekdayEvent() {
    const dessertCount = this.getDessertCount();
    const totalWeekdayDiscountAmount = dessertCount * 2023;
    return totalWeekdayDiscountAmount;
  }
}

export default EventCalculator;
