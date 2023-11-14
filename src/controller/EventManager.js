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
}
export default EventManager;
