import MenuList from './MenuList';

class Order {
  #orderMenu;
  #visitDate;

  constructor(visitDateNumber, orderMenuArray) {
    this.#visitDate = visitDateNumber;
    this.#orderMenu = orderMenuArray;
  }

  formatOrderMenuObject() {
    const formattedOrder = this.#orderMenu.map((orderItem) => {
      const [menu, quantity] = orderItem.split('-');
      return { name: menu, count: parseInt(quantity, 10) };
    });

    this.#orderMenu = formattedOrder;
  }

  getFormattedOrder() {
    return this.#orderMenu;
  }

  setTotalPrice() {
    let totalPrice = 0;

    this.#orderMenu.forEach((orderItem) => {
      const menuInfo = MenuList[orderItem.name];
      if (menuInfo) {
        totalPrice += menuInfo.price * orderItem.count;
      }
    });
    return totalPrice;
  }
}
export default Order;
