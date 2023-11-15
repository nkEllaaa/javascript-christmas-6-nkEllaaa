import MenuList from '../MenuList';
import { PRICE } from '../constants/constants';

class EventCalculator {
  #totalPrice;
  #totalDiscountPrice;
  #expectedTotalPrice;
  #eventList;
  #dessertCount;
  #mainCount;
  #visitDate;
  #orderMenu;
  #discountAmount;

  constructor() {
    this.#totalPrice;
    this.#totalDiscountPrice = 0;
    this.#expectedTotalPrice = 0;
    this.#eventList;
    this.#dessertCount;
    this.#mainCount;
    this.#visitDate;
    this.#orderMenu;
    this.#discountAmount = {
      크리스마스_디데이_할인: 0,
      평일_할인: 0,
      주말_할인: 0,
      특별_할인: 0,
      증정_이벤트: 0,
    };
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

  getTotalDiscountAmount() {
    return this.#totalDiscountPrice;
  }

  getExpectedTotalPrice() {
    return this.#totalPrice - this.#expectedTotalPrice;
  }

  getDiscountAmount() {
    return this.#discountAmount;
  }

  getEventListIncludeBadge() {
    return this.#eventList;
  }

  calculateAllEvents() {
    this.calculateChristmasEvent();
    this.calculateDessertAndMainCount();
    this.calculateWeekdayEvent();
    this.calculateWeekendEvent();
    this.calculateSpecialEvent();
    this.calculateChampagneEvent();
    this.calculateBadgeEvent();
  }

  // 크리스마스 이벤트 계산
  calculateChristmasEvent() {
    if (this.#eventList.크리스마스_디데이_할인) {
      const christMasDiscountAmount = (this.#visitDate - 1) * PRICE.accumulatePerDay + PRICE.firstDay;
      this.#discountAmount.크리스마스_디데이_할인 = christMasDiscountAmount;
      this.#totalDiscountPrice += christMasDiscountAmount;
      this.#expectedTotalPrice += christMasDiscountAmount;
    }
  }

  // 디저트, 메인 메뉴 개수 파악
  calculateDessertAndMainCount() {
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

    this.#dessertCount = dessertCount;
    this.#mainCount = mainCount;
  }

  // 주중 이벤트 계산
  calculateWeekdayEvent() {
    if (this.#eventList.평일_할인) {
      const weekdayDiscountAmount = this.#dessertCount * PRICE.discountPerDish;
      this.#discountAmount.평일_할인 = weekdayDiscountAmount;
      this.#totalDiscountPrice += weekdayDiscountAmount;
      this.#expectedTotalPrice += weekdayDiscountAmount;
    }
  }

  // 주말 이벤트 계산
  calculateWeekendEvent() {
    if (this.#eventList.주말_할인) {
      const weekendDiscountAmount = this.#mainCount * PRICE.discountPerDish;
      this.#discountAmount.주말_할인 = weekendDiscountAmount;
      this.#totalDiscountPrice += weekendDiscountAmount;
      this.#expectedTotalPrice += weekendDiscountAmount;
    }
  }

  // 스페셜 이벤트 계산
  calculateSpecialEvent() {
    if (this.#eventList.특별_할인) {
      const specialDiscountAmount = PRICE.specialDiscount;
      this.#discountAmount.특별_할인 = specialDiscountAmount;
      this.#totalDiscountPrice += specialDiscountAmount;
      this.#expectedTotalPrice += specialDiscountAmount;
    }
  }

  // 샴페인 이벤트 계산
  calculateChampagneEvent() {
    if (this.#totalPrice >= PRICE.isChampagnePossible) {
      const champagneDiscountAmount = PRICE.champagne;
      this.#discountAmount.증정_이벤트 = champagneDiscountAmount;
      this.#totalDiscountPrice += champagneDiscountAmount;
    }
  }

  // 배지 이벤트 계산
  calculateBadgeEvent() {
    if (this.#totalDiscountPrice >= PRICE.BadgeSanta) this.#eventList.이벤트_배지 = '산타';
    else if (this.#totalDiscountPrice >= PRICE.BadgeTree) this.#eventList.이벤트_배지 = '트리';
    else if (this.#totalDiscountPrice >= PRICE.BadgeStar) this.#eventList.이벤트_배지 = '별';
  }
}

export default EventCalculator;
