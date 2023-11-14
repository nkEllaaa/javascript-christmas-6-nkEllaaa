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
}

export default EventCalculator;
