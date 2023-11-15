import EventPlanner from './controller/EventPlanner';
import EventCalculator from './controller/EventCalculator';
import EventManager from './controller/EventManager';
import Order from './Order';

class App {
  async run() {
    const eventPlanner = new EventPlanner();
    const eventCalculator = new EventCalculator();
    const eventManager = new EventManager();

    // 안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.
    eventPlanner.printWelcome();

    // 날짜 입력받고 유효성 검사까지 통과
    const visitDateNumber = await eventPlanner.getVisitDate();

    // 주문 메뉴 입력받고 유효성 검사까지 통과
    const orderMenuArray = await eventPlanner.getOrderMenu();

    //12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!
    eventPlanner.printDiscountForDate(visitDateNumber);

    // 유효한 날짜와 메뉴로 오더 생성
    const order = new Order(visitDateNumber, orderMenuArray);

    // 오더에서 주문 메뉴의 형식을 바꿔줌
    order.formatOrderMenuObject();
    const formattedOrder = order.getFormattedOrder();
    console.log('포멧', formattedOrder);

    // <주문 메뉴>
    eventPlanner.printTitleOrderMenu();
    // 티본스테이크 1개
    // 바비큐립 1개
    // 초코케이크 2개
    // 제로콜라 1개
    eventPlanner.printOrderMenu(formattedOrder);

    // 총주문금액 계산
    const totalPrice = order.setTotalPrice();

    // <할인 전 총주문 금액>
    eventPlanner.printTitleTotalPrice();
    // <142,000원>
    eventPlanner.printPrice(totalPrice);

    // 이벤트 매니저로 유효한 이벤트 판단
    eventManager.getVisitDateNumber(visitDateNumber);
    eventManager.formatDateAndjudgeValidEvents(totalPrice);

    // 유효한 이벤트 리스트 겟
    const eventList = eventManager.getEventList();
    console.log('이벤트 리스트', eventList);

    // 유효한 이벤트, 총주문금액, 방문날짜, 주문을 계산기에 넘겨줌
    eventCalculator.setEventList(eventList);
    eventCalculator.setTotalPrice(totalPrice);
    eventCalculator.setVisitDate(visitDateNumber);
    eventCalculator.setOrderMenu(formattedOrder);

    // 이벤트 계산기를 실행시켜서 할인받는 금액을 계산
    eventCalculator.calculateAllEvents();

    // 총혜택금액
    const totalDiscount = eventCalculator.getTotalDiscountAmount();
    console.log('총혜택금액', totalDiscount);

    // 샴페인 가격을 뺀 나머지 혜택 금액 = 할인 후 예상 결제 금액
    const expectedTotalPrice = eventCalculator.getExpectedTotalPrice();
    console.log('할인 후 예상 결제 금액', expectedTotalPrice);

    const discountAmount = eventCalculator.getDiscountAmount();
    console.log('디스카운트어마운ㅊ트', discountAmount);

    const eventListBadge = eventCalculator.getEventListIncludeBadge();
    console.log('배지포함', eventListBadge);
    if (totalPrice < 10000) {
      // <증정 메뉴>
      eventPlanner.printTitleChampagne();
      // 없음
      eventPlanner.printNothing();
      // <혜택 내역>
      eventPlanner.printTitleTotalDiscount();
      // <없음>
      eventPlanner.printNothing();
      //<총 혜택 금액>
      eventPlanner.printTitleExpectedPrice();
      // <없음>
      eventPlanner.printNothing();
      // <할인 후 예상 결제 금액>
      eventPlanner.printTitleTotalPriceAfterDiscount();
      // <8500원>
      eventPlanner.printPrice(totalPrice);
    } else {
      // <증정 메뉴>
      eventPlanner.printTitleChampagne();
      //샴페인 1개
      eventPlanner.printChamphagne();

      // <혜택 내역>
      eventPlanner.printTitleTotalDiscount();
      // 크리스마스 디데이 할인: -1,200원
      // 평일 할인: -4,046원
      // 특별 할인: -1,000원
      // 증정 이벤트: -25,000원
      eventPlanner.printTotalDiscountList(discountAmount, eventList);
      //<총 혜택 금액>
      eventPlanner.printTitleExpectedPrice();
      eventPlanner.printDiscount(totalDiscount);
      // <할인 후 예상 결제 금액>
      eventPlanner.printTitleTotalPriceAfterDiscount();
      // <8500원>
      eventPlanner.printPrice(expectedTotalPrice);
      // <12월 이벤트 배지>
      eventPlanner.printTitleBadge();
      eventPlanner.printBadge(eventListBadge.이벤트_배지);
    }
  }
}

export default App;
