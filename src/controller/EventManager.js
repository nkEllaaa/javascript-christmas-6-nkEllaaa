import { DATE, PRICE } from '../constants/constants'

class EventManager {
  #visitDateNumber;
  #visitDayNumber;
  #eventList;

  constructor() {
    this.#visitDateNumber;
    this.#visitDayNumber;
    this.#eventList = {
      크리스마스_디데이_할인: false,
      평일_할인: false,
      주말_할인: false,
      특별_할인: false,
      증정_이벤트: false,
      이벤트_배지: '',
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

  getVisitDateNumber(visitDateNumber) {
    this.#visitDateNumber = visitDateNumber;
  }

  formatDateTwoDigits() {
    if (this.#visitDateNumber < 10) this.#visitDateNumber = '0' + this.#visitDateNumber;
  }

  formatDateToDay() {
    const formattedDate = `2023-12-${this.#visitDateNumber}`;
    const visitDayNumber = new Date(formattedDate).getDay();
    this.#visitDayNumber = visitDayNumber;
  }

  checkChristmasEvent() {
    if (this.#visitDateNumber >= DATE.eventStart && this.#visitDateNumber <= DATE.christmas)
      this.#eventList.크리스마스_디데이_할인 = true;
  }

  checkweekdayOrEndEvent() {
    if (this.#visitDayNumber === DATE.friday || this.#visitDayNumber === DATE.saturdaty) {
      this.#eventList.주말_할인 = true;
      this.#eventList.평일_할인 = false;
    } else {
      this.#eventList.평일_할인 = true;
      this.#eventList.주말_할인 = false;
    }
  }

  checkSpecialEvent() {
    if (this.#visitDayNumber === DATE.sunday || this.#visitDateNumber === DATE.christmas)
      this.#eventList.특별_할인 = true;
  }

  checkChampagne(totalPrice) {
    if (totalPrice >= PRICE.isChampagnePossible) this.#eventList.증정_이벤트 = true;
  }
}
export default EventManager;
