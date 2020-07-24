import { DearestRepository } from '../../../src/repository/dearestRepository';
import { DearestApplicationService } from '../../../src/application/service/dearestApplicationService';

Moment.moment = jest.fn(() => ({
  subtract: jest.fn(() => ({
    toDate: jest.fn(() => new Date(2020, 4, 24)),
  })),
}));

describe('DearestApplicationService', () => {
  it('returns all registered names', () => {
    const dr = new DearestRepository();
    const das = new DearestApplicationService(dr);
    jest.spyOn(DearestRepository.prototype, 'getAllDearestsData')
      .mockReturnValueOnce([
        [1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)],
        [2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)],
        [3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)],
        [4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)],
      ])
    const names = das.getNames();
    expect(names).toStrictEqual(['Izuku Midoriya', 'Katsuki Bakugo']);
  });
});
