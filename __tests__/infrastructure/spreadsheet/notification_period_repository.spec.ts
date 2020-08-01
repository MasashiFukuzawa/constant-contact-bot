import { NotificationPeriod } from '../../../src/domain/domain/notification_period/notification_period';
import { SpreadsheetNotificationPeriodRepository } from '../../../src/spreadsheet_infrastructure/notification_periods/spreadsheet_notification_period_repository';

describe('NotificationPeriodRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 3),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [1, 1, 'week'],
          [2, 3, 'months'],
          [3, 6, 'months'],
          [4, 1, 'year'],
        ]),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  describe('#getAll', () => {
    it('returns all data in notification_periods table', () => {
      const snpr = new SpreadsheetNotificationPeriodRepository();
      const data = snpr.getAll();
      expect(data[0]).toStrictEqual(new NotificationPeriod(1, 1, 'week'));
      expect(data[1]).toStrictEqual(new NotificationPeriod(2, 3, 'months'));
      expect(data[2]).toStrictEqual(new NotificationPeriod(3, 6, 'months'));
      expect(data[3]).toStrictEqual(new NotificationPeriod(4, 1, 'year'));
    });
  });
});
