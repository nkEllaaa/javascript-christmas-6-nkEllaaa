import validateVisitDate from '../../src/validation/validatevisitDate';
import ERROR_DATE from '../../src/constants/error';

describe('방문 날짜 테스트', () => {
  test('방문 날짜 공백 테스트', () => {
    const visitDate = '';
    expect(() => validateVisitDate(visitDate)).toThrow(ERROR_DATE.none);
  });

  test('방문 날짜 타입 테스트', () => {
    const visitDate = 'a';
    expect(() => validateVisitDate(visitDate)).toThrow(ERROR_DATE.type);
  });

  test('방문 날짜 범위 테스트', () => {
    const visitDate = 32;
    expect(() => validateVisitDate(visitDate)).toThrow(ERROR_DATE.dateRange);
  });
});
