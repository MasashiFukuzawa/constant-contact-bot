import { NotificationPeriodRepository } from '../../src/repository/NotificationPeriodsRepository';

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

describe('DearestRepository', () => {
  describe('#getAllDearestsData', () => {
    it('returns all data in notification_periods table', () => {
      const np = new NotificationPeriodRepository();
      const names = np.getAllNotificationPeriodsData();
      expect(names[0]).toStrictEqual([1, 1, 'week']);
      expect(names[1]).toStrictEqual([2, 3, 'months']);
      expect(names[2]).toStrictEqual([3, 6, 'months']);
      expect(names[3]).toStrictEqual([4, 1, 'year']);
    });
  });
});
