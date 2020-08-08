import { SpreadsheetDearestRepository } from '../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository';
import { Dearest } from '../../../src/domain/domain/dearest/dearest';

describe('DearestRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 5),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'],
          [2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1), '4/20'],
          [3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), '12/27'],
          [4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1), '1/11'],
        ]),
        setValues: jest.fn(),
        clear: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const sdr = new SpreadsheetDearestRepository();

  describe('#getAll', () => {
    it('returns all data in dearests table', () => {
      const data = sdr.getAll();
      expect(data[0]).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'));
      expect(data[1]).toStrictEqual(new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1), '4/20'));
      expect(data[2]).toStrictEqual(new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), '12/27'));
      expect(data[3]).toStrictEqual(new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1), '1/11'));
    });
  });

  describe('#findByName', () => {
    describe('when valid', () => {
      it('returns a dearest resource', () => {
        const dearest = sdr.findByName('Izuku Midoriya');
        expect(dearest).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'));
      });
    });

    describe('when invalid', () => {
      it('returns null', () => {
        const dearest = sdr.findByName('All Might');
        expect(dearest).toBe(null);
      });
    });
  });

  describe('#create', () => {
    it('creates successfully', () => {
      const lastContactedDate = new Date('2020/8/1');
      const birthday = '6/10';
      const dearest = sdr.create('All Might', 5, 4, lastContactedDate, birthday);
      expect(dearest).toStrictEqual(new Dearest(5, 'All Might', 5, 4, lastContactedDate, birthday));
    });
  });

  describe('#update', () => {
    describe('when wants to update lastContactedDate', () => {
      it('updates successfully', () => {
        const spy = jest.spyOn(global, 'Date').mockImplementation();
        const dearest = new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15');
        const updatedDearest = sdr.update(dearest, 4, 4, null);
        expect(updatedDearest).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 4,  4, new Date(), '7/15'));
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('when does not want to update lastContactedDate', () => {
      it('updates successfully', () => {
        const dearest = new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15');
        const updatedDearest = sdr.update(dearest, 4, 4, null, false);
        expect(updatedDearest).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 4,  4, new Date(2020, 1, 1), '7/15'));
      });
    });
  });

  describe('#delete', () => {
    it('deletes successfully', () => {
      const dearest = new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15');
      const deletedDearest = sdr.delete(dearest);
      expect(deletedDearest).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'));
    });
  });
});
