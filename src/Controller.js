import { InputView } from './InputView';
import validateVisitDate from './validation/validatevisitDate';

class Controller {
  constructor() {
    this.visitDate = InputView.getVisitDate();
  }
  getVisitDate() {
    while (true) {
      try {
        validateVisitDate(this.visitDate);
        return;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default Controller;
