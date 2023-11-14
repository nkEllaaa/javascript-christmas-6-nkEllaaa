class EventManager {
  #visitDateNumber;
  #visitDayNumber;
  #eventList;

  constructor() {
    this.#visitDateNumber;
    this.#visitDayNumber;
    this.#eventList = {
      christmas: false,
      weekday: false,
      weekend: false,
      special: false,
      champagne: false,
      badge: '',
    };
  }

  getEventList() {
    return this.#eventList;
  }

  formatDateAndjudgeValidEvents(totalPrice) {
    this.formatDateTwoDigits();
    this.formatDateToDay();
    
    this.checkChristmasEvent();
    this.checkweekdayOrEndEvent();
    this.checkSpecialEvent();
    this.checkChampagne(totalPrice);
  }

  //앱으로부터 방문 날짜를 받음
  getVisitDateNumber(visitDateNumber) {
    this.#visitDateNumber = visitDateNumber;
  }

  //방문날짜를 두자리수로 포맷팅
  formatDateTwoDigits() {
    if (this.#visitDateNumber < 10) this.#visitDateNumber = '0' + this.#visitDateNumber;
  }

  //방문날짜에서 요일로 변환
  formatDateToDay() {
    const formattedDate = `2023-12-${this.#visitDateNumber}`;
    const visitDayNumber = new Date(formattedDate).getDay();
    console.log('포메티드대이트', formattedDate);
    this.#visitDayNumber = visitDayNumber;
  }

  //크리스마스 이벤트 판단
  checkChristmasEvent() {
    if (this.#visitDateNumber >= 1 && this.#visitDateNumber <= 25) this.#eventList.christmas = true;
  }

  //주말,주중 이벤트 판단
  checkweekdayOrEndEvent() {
    if (this.#visitDayNumber === 5 || this.#visitDayNumber === 6) {
      this.#eventList.weekend = true;
      this.#eventList.weekday = false;
    } else {
      this.#eventList.weekday = true;
      this.#eventList.weekend = false;
    }
  }

  //스페셜 이벤트 판단
  checkSpecialEvent() {
    if (this.#visitDayNumber === 0 || this.#visitDateNumber === 25) this.#eventList.special = true;
  }

  //샴페인 증정 이벤트 판단
  checkChampagne(totalPrice) {
    if (totalPrice >= 120000) this.#eventList.champagne = true;
  }

  //배지 이벤트 판단
  // checkBadgeEvent() {
  // 계산기에서 총 할인 금액 가져와서 금액에 따라 배지 초기화
  // }
}
export default EventManager;
