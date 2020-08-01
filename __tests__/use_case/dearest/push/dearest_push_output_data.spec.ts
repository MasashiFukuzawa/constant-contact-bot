import { DearestPushOutputData } from "../../../../src/use_case/dearest/push/dearest_push_output_data";
import { Dearest } from "../../../../src/domain/domain/dearest/dearest";
import { NotificationPeriod } from "../../../../src/domain/domain/notification_period/notification_period";

describe('DearestPushOutputData', () => {
  Moment.moment = jest.fn(() => ({
    format: jest.fn(() => '7/15'),
    subtract: jest.fn(() => ({
      toDate: jest.fn(() => new Date(2020, 4, 25))
    })),
  }));

  const dearestPushOutputData = new DearestPushOutputData();

  describe('#getNames', () => {
    it('returns dearest names', () => {
      const dearests = [
        new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 7, 1), '7/15'),
        new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 6, 1), '4/20'),
        new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), '12/27'),
        new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 4, 1), '1/11')
      ];
      const notificationPeriods = [
        new NotificationPeriod(1, 1, 'week'),
        new NotificationPeriod(2, 3, 'months'),
        new NotificationPeriod(3, 6, 'months'),
        new NotificationPeriod(4, 1, 'year')
      ];
      const names = dearestPushOutputData.getNames(dearests, notificationPeriods);
      expect(names[0]).toBe('Izuku Midoriya');
      expect(names[1]).toBe('Shoto Todoroki');
    });
  });
});
