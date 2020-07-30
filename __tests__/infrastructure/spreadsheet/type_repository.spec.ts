import { Type } from '../../../src/domain/domain/type/type';
import { SpreadsheetTypeRepository } from '../../../src/spreadsheet_infrastructure/types/spreadsheet_type_repository';

describe('TypeRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 5),
      getLastColumn: jest.fn(() => 2),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [1, 'family'],
          [2, 'relative'],
          [3, 'lover'],
          [4, 'best_friend'],
          [5, 'friend'],
        ]),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  describe('#getAll', () => {
    it('returns all data in types table', () => {
      const snpr = new SpreadsheetTypeRepository();
      const data = snpr.getAll();
      expect(data[0]).toStrictEqual(new Type(1, 'family'));
      expect(data[1]).toStrictEqual(new Type(2, 'relative'));
      expect(data[2]).toStrictEqual(new Type(3, 'lover'));
      expect(data[3]).toStrictEqual(new Type(4, 'best_friend'));
      expect(data[4]).toStrictEqual(new Type(5, 'friend'));
    });
  });
});
