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
  calculateChristmasEvent() {
    const christMasDiscountAmount = this.#visitDate - 1 * 100 + 1000;
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
    this.#totalDiscountPrice += weekdayDiscountAmount;
  }

  // 주말 이벤트 계산
  calculateWeekendEvent() {
    const weekendDiscountAmount = this.#mainCount * 2023;
    this.#totalDiscountPrice += weekendDiscountAmount;
  }

  // 스페셜 이벤트 계산
  calculateSpecialEvent() {
    if (this.#eventList.special === true) {
      const specialDiscountAmount = 1000;
      this.#totalDiscountPrice += specialDiscountAmount;
    }
  }

  // 샴페인 이벤트 계산
  calculateChampagneEvent() {
    if (this.#totalPrice >= 120000) {
      const champagneDiscountAmount = 25000;
      this.#totalDiscountPrice += champagneDiscountAmount;
    }
  }

  // 배지 이벤트 계산
  calculateBadgeEvent() {
    if (this.#totalDiscountPrice >= 20000) this.#eventList.badge = '산타';
    else if (this.#totalDiscountPrice >= 10000) this.#eventList.badge = '트리';
    else if (this.#totalDiscountPrice >= 5000) this.#eventList.badge = '별';
  }
}

export default EventCalculator;
