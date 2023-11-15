import { ERROR_DATE } from '../constants/error';

const validateVisitDate = (visitDate) => {
  if (visitDate.length === 0) {
    throw Error(ERROR_DATE.none);
  }

  const visitDateToNumber = parseInt(visitDate, 10);
  if (Number.isNaN(visitDateToNumber)) {
    throw Error(ERROR_DATE.type);
  }

  if (visitDateToNumber < 1 || visitDateToNumber > 31) {
    throw Error(ERROR_DATE.dateRange);
  }
  return visitDateToNumber;
};

export default validateVisitDate;