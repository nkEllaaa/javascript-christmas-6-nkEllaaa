import EventPlanner from './controller/EventPlanner';
import EventCalculator from './controller/EventCalculator';
import EventManager from './controller/EventManager';
import Order from './Order';
import { PRICE } from './constants/constants';

class App {
  #totalPriceBeforeDiscount;
  #visitDate;
  #orderMenu;
  #formattedOrderMenu;
  #order;
  #eventList;
  #discountAmount;
  #expectedPriceAfterDiscount;
  #eventListBadge;
  #discountPriceList;
  #eventPlanner;
  #eventCalculator;
  #eventManager;

  constructor() {
    this.#totalPriceBeforeDiscount;
    this.#visitDate;
    this.#orderMenu;
    this.#formattedOrderMenu;
    this.#order;
    this.#eventList;
    this.#discountAmount;
    this.#expectedPriceAfterDiscount;
    this.#eventListBadge;
    this.#discountPriceList;
    this.#eventPlanner = new EventPlanner();
    this.#eventCalculator = new EventCalculator();
    this.#eventManager = new EventManager();
  }
  async run() {
    await this.createOrder();
    this.formatOrder();
    this.createEventList();
    this.calculateEvent();
    this.runEventPlanner();
  }

  async createOrder() {
    this.#eventPlanner.printWelcome();
    this.#visitDate = await this.#eventPlanner.getVisitDate();
    this.#orderMenu = await this.#eventPlanner.getOrderMenu();
    this.#eventPlanner.printDiscountForDate(this.#visitDate);
    this.#order = new Order(this.#visitDate, this.#orderMenu);
  }

  formatOrder() {
    this.#order.formatOrderMenuObject();
    this.#formattedOrderMenu = this.#order.getFormattedOrder();
    this.#totalPriceBeforeDiscount = this.#order.setTotalPrice();
  }

  createEventList() {
    this.#eventManager.getVisitDateNumber(this.#visitDate);
    this.#eventManager.formatDateAndjudgeValidEvents(this.#totalPriceBeforeDiscount);
    this.#eventList = this.#eventManager.getEventList();
  }

  calculateEvent() {
    this.#eventCalculator.setEventList(this.#eventList);
    this.#eventCalculator.setTotalPrice(this.#totalPriceBeforeDiscount);
    this.#eventCalculator.setVisitDate(this.#visitDate);
    this.#eventCalculator.setOrderMenu(this.#formattedOrderMenu);

    this.#eventCalculator.calculateAllEvents();
    this.#discountAmount = this.#eventCalculator.getTotalDiscountAmount();
    this.#expectedPriceAfterDiscount = this.#eventCalculator.getExpectedTotalPrice();
    this.#discountPriceList = this.#eventCalculator.getDiscountAmount();
    this.#eventListBadge = this.#eventCalculator.getEventListIncludeBadge();
  }

  runOrderMenu() {
    this.#eventPlanner.printTitleOrderMenu();
    this.#eventPlanner.printOrderMenu(this.#formattedOrderMenu);
  }

  runTotalPriceBeforeDiscount() {
    this.#eventPlanner.printTitleTotalPrice();
    this.#eventPlanner.printPrice(this.#totalPriceBeforeDiscount);
  }

  runIsChampagne() {
    this.#eventPlanner.printTitleChampagne();
    if (this.#totalPriceBeforeDiscount >= PRICE.isChampagnePossible) {
      this.#eventPlanner.printChamphagne();
      return;
    }
    this.#eventPlanner.printNothing();
  }

  runBenefitList() {
    this.#eventPlanner.printTitleTotalDiscount();
    if (this.#totalPriceBeforeDiscount >= PRICE.isEventPossible) {
      this.#eventPlanner.printTotalDiscountList(this.#discountPriceList, this.#eventList);
      return;
    }
    this.#eventPlanner.printNothing();
  }

  runTotalBenefitPrice() {
    this.#eventPlanner.printTitleExpectedPrice();
    if (this.#totalPriceBeforeDiscount >= PRICE.isEventPossible) {
      this.#eventPlanner.printDiscount(this.#discountAmount);
      return;
    }
    this.#eventPlanner.printNothing();
  }

  runExpectedPriceAfterDiscount() {
    this.#eventPlanner.printTitleTotalPriceAfterDiscount();
    this.#eventPlanner.printPrice(this.#expectedPriceAfterDiscount);
  }

  runEventBadge() {
    this.#eventPlanner.printTitleBadge();
    if (
      this.#totalPriceBeforeDiscount >= PRICE.isEventPossible &&
      this.#discountAmount >= PRICE.BadgeStar
    ) {
      this.#eventPlanner.printBadge(this.#eventListBadge.이벤트_배지);
      return;
    }
    this.#eventPlanner.printNothing();
  }

  runEventPlanner() {
    this.runOrderMenu();
    this.runTotalPriceBeforeDiscount();
    this.runIsChampagne();
    this.runBenefitList();
    this.runTotalBenefitPrice();
    this.runExpectedPriceAfterDiscount();
    this.runEventBadge();
  }
}

export default App;
