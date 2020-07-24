import { DearestRepository } from '../../src/repository/dearestRepository';

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
    })),
  })),
})) as any;

PropertiesService.getScriptProperties = jest.fn(() => ({
  getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
})) as any;

describe('DearestRepository', () => {
  describe('#getAllDearestsData', () => {
    it('returns all data in dearests table', () => {
      const dr = new DearestRepository();
      const names = dr.getAllDearestsData();
      expect(names[0]).toStrictEqual([1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)]);
      expect(names[1]).toStrictEqual([2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)]);
      expect(names[2]).toStrictEqual([3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)]);
      expect(names[3]).toStrictEqual([4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)]);
    });
  });
});
