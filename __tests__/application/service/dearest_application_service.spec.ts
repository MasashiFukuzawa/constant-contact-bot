import { DearestApplicationService } from '../../../src/application/service/dearest_application_service';
import { DearestRepository } from '../../../src/repository/dearest_repository';
import { NotificationPeriodApplicationService } from '../../../src/application/service/notification_period_application_service';

Moment.moment = jest.fn(() => ({
  subtract: jest.fn(() => ({
    toDate: jest.fn().mockReturnValue(new Date(2020, 4, 25))
  })),
}));

describe('DearestApplicationService', () => {
  it('returns names of people who have not been contacted for a period of time', () => {
    const dr = new DearestRepository();
    const das = new DearestApplicationService(dr);
    jest.spyOn(DearestRepository.prototype, 'getAllDearestsData')
      .mockReturnValue([
        [1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)],
        [2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)],
        [3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)],
        [4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)],
      ])
    jest.spyOn(NotificationPeriodApplicationService.prototype, 'getNotificationPeriod')
      .mockReturnValue({ id: 2, term: 3, unit: 'months' })
    const names = das.getNames();
    expect(names).toStrictEqual(['Izuku Midoriya', 'Katsuki Bakugo']);
  });
});
