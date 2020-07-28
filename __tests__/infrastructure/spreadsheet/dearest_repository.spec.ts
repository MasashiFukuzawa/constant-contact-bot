import { SpreadsheetDearestRepository } from '../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository';
import { Dearest } from '../../../src/domain/domain/dearest/dearest';

describe('DearestRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 5),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)],
          [2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)],
          [3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)],
          [4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)],
        ]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  describe('#findByName', () => {
    it('returns a dearest resource', () => {
      const sdr = new SpreadsheetDearestRepository();
      const dearest = sdr.findByName('Izuku Midoriya');
      expect(dearest.getId().toNumber()).toBe(1);
      expect(dearest.getName().toString()).toBe('Izuku Midoriya');
      expect(dearest.getTypeId().toNumber()).toBe(1);
      expect(dearest.getNotificationPeriodId().toNumber()).toBe(3);
      expect(dearest.getLastContactedDate().toDate()).toStrictEqual(new Date(2020, 1, 1));
    });
  });

  describe('#update', () => {
    it('updates successfully', () => {
      Date.now = jest.fn();
      const sdr = new SpreadsheetDearestRepository();
      const dearest = new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1));
      const result = sdr.update(dearest, 4, 4);
      expect(result.getTypeId().toNumber()).toBe(4);
      expect(result.getNotificationPeriodId().toNumber()).toBe(4);
      expect(result.getLastContactedDate().toDate()).toStrictEqual(new Date());
    });
  });
});
