import Order from '../Order';
import MenuList from '../MenuList';

class EventCalculator {
  #totalPrice;
  #totalDiscountPrice;
  #eventList;
  #dissertCount;
  #mainCount;
  #visitDate;
  #orderMenu;

  constructor() {
    this.#totalPrice;
    this.#totalDiscountPrice;
    this.#eventList;
    this.#dissertCount;
    this.#mainCount;
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

  // 디저트, 메인 메뉴 개수 파악
  getDessertCount() {
    let dessertCount = 0;
    let mainCount = 0;
    this.#orderMenu.forEach((orderItem) => {
      const SameMenu = MenuList[orderItem.name];
      if (SameMenu.type === 'dessert') {
        dessertCount += orderItem.count;
      } else if (SameMenu.type === 'main') {
        mainCount += orderItem.count;
      }
    });

    this.#dissertCount = dessertCount;
    this.#mainCount = mainCount;
  }

  // 주중 이벤트 계산
  calculateWeekdayEvent() {
    const weekdayDiscountAmount = this.#dessertCount * 2023;
    return weekdayDiscountAmount;
  }

  // 주말 이벤트 계산
  calculateWeekendEvent() {
    const weekendDiscountAmount = this.#mainCount * 2023;
    return weekendDiscountAmount;
  }
}

export default EventCalculator;
