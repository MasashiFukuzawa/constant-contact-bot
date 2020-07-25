import { NotificationPeriodApplicationService } from '../../../src/application/service/NotificationPeriodApplicationService';
import { NotificationPeriodRepository } from '../../../src/repository/NotificationPeriodsRepository';

Moment.moment = jest.fn(() => ({
  subtract: jest.fn(() => ({
    toDate: jest.fn(() => new Date(2020, 4, 24)),
  })),
}));

describe('DearestApplicationService', () => {
  it('returns names of people who have not been contacted for a period of time', () => {
    const npr = new NotificationPeriodRepository();
    const npas = new NotificationPeriodApplicationService(npr);
    jest.spyOn(NotificationPeriodRepository.prototype, 'getAllNotificationPeriodsData')
      .mockReturnValue([
        [1, 1, 'week'],
        [2, 3, 'months'],
        [3, 6, 'months'],
        [4, 1, 'year'],
      ])
    const notificationPeriod = npas.getNotificationPeriod(2);
    expect(notificationPeriod).toStrictEqual({ id: 2, term: 3, unit: 'months'});
  });
});
