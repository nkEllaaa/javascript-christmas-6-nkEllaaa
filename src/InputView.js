const InputView = {
  async getVisitDate() {
    const visitDate = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (월은 제외하고 날짜만 입력해주세요. e.g. 12)'
    );
    return visitDate;
  },

  async getMenuAndQuantity() {
    const MenuAndQuantity = await Console.readLineAsync(
      '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)'
    );
    return MenuAndQuantity;
  },
};

export default InputView;
