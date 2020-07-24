import { DearestRepository } from '../../src/repository/dearestRepository';

SpreadsheetApp.openById = jest.fn(() => ({
  getSheetByName: jest.fn(() => ({
    getLastRow: jest.fn(() => 4),
    getRange: jest.fn(() => ({
      getValues: jest.fn(() => [
        ['Izuku Midoriya'],
        ['Katsuki Bakugo'],
        ['Ochako Uraraka'],
        ['Shoto Todoroki'],
      ]),
    })),
  })),
})) as any;

PropertiesService.getScriptProperties = jest.fn(() => ({
  getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
})) as any;

describe('DearestRepository', () => {
  it('returns all registered names', () => {
    const dr = new DearestRepository();
    const names = dr.getNames();
    expect(names[0][0]).toBe('Izuku Midoriya');
    expect(names[1][0]).toBe('Katsuki Bakugo');
    expect(names[2][0]).toBe('Ochako Uraraka');
    expect(names[3][0]).toBe('Shoto Todoroki');
  });
});
