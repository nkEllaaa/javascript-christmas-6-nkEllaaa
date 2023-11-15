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
    // 안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
    this.#eventPlanner.printWelcome();

    // 날짜 입력받고 유효성 검사까지 통과
    this.#visitDate = await this.#eventPlanner.getVisitDate();

    // 주문 메뉴 입력받고 유효성 검사까지 통과
    this.#orderMenu = await this.#eventPlanner.getOrderMenu();

    //12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!
    this.#eventPlanner.printDiscountForDate(this.#visitDate);

    // 유효한 날짜와 메뉴로 오더 생성
    this.#order = new Order(this.#visitDate, this.#orderMenu);

    // 오더에서 주문 메뉴의 형식을 바꿔줌
    this.#order.formatOrderMenuObject();
    this.#formattedOrderMenu = this.#order.getFormattedOrder();

    // 총주문금액 계산
    this.#totalPriceBeforeDiscount = this.#order.setTotalPrice();

    // 이벤트 매니저로 유효한 이벤트 판단
    this.#eventManager.getVisitDateNumber(this.#visitDate);
    this.#eventManager.formatDateAndjudgeValidEvents(this.#totalPriceBeforeDiscount);

    // 유효한 이벤트 리스트 겟
    this.#eventList = this.#eventManager.getEventList();
    // console.log('이벤트 리스트', eventList);

    // 유효한 이벤트, 총주문금액, 방문날짜, 주문을 계산기에 넘겨줌
    this.#eventCalculator.setEventList(this.#eventList);
    this.#eventCalculator.setTotalPrice(this.#totalPriceBeforeDiscount);
    this.#eventCalculator.setVisitDate(this.#visitDate);
    this.#eventCalculator.setOrderMenu(this.#formattedOrderMenu);

    // 이벤트 계산기를 실행시켜서 할인받는 금액을 계산
    this.#eventCalculator.calculateAllEvents();

    // 총혜택금액
    this.#discountAmount = this.#eventCalculator.getTotalDiscountAmount();

    // 샴페인 가격을 뺀 나머지 혜택 금액 = 할인 후 예상 결제 금액
    this.#expectedPriceAfterDiscount = this.#eventCalculator.getExpectedTotalPrice();
    this.#discountPriceList = this.#eventCalculator.getDiscountAmount();
    this.#eventListBadge = this.#eventCalculator.getEventListIncludeBadge();

    this.runEventPlanner();
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
    if (this.#totalPriceBeforeDiscount >= PRICE.isEventPossible && this.#discountAmount >= PRICE.BadgeStar) {
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
