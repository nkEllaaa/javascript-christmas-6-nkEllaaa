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

}
export default Order;
