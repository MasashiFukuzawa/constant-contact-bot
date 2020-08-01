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

  const sdr = new SpreadsheetDearestRepository();

  describe('#getAll', () => {
    it('returns all data in dearests table', () => {
      const data = sdr.getAll();
      expect(data[0]).toStrictEqual(new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)));
      expect(data[1]).toStrictEqual(new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)));
      expect(data[2]).toStrictEqual(new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)));
      expect(data[3]).toStrictEqual(new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)));
    });
  });

  describe('#findByName', () => {
    describe('when valid', () => {
      it('returns a dearest resource', () => {
        const dearest = sdr.findByName('Izuku Midoriya');
        expect(dearest.getId().toNumber()).toBe(1);
        expect(dearest.getName().toString()).toBe('Izuku Midoriya');
        expect(dearest.getTypeId().toNumber()).toBe(1);
        expect(dearest.getNotificationPeriodId().toNumber()).toBe(3);
        expect(dearest.getLastContactedDate().toDate()).toStrictEqual(new Date(2020, 1, 1));
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
    describe('when valid', () => {
      it('creates successfully', () => {
        const now = new Date('2020/7/29 01:00:00');
        Date.now = jest.fn().mockReturnValue(now.valueOf());
        jest.spyOn(global, 'Date').mockImplementation();

        const dearest = sdr.create('All Might', 5, 4);
        expect(dearest.getId().toNumber()).toBe(5);
        expect(dearest.getName().toString()).toBe('All Might');
        expect(dearest.getTypeId().toNumber()).toBe(5);
        expect(dearest.getNotificationPeriodId().toNumber()).toBe(4);
        expect(dearest.getLastContactedDate().toDate()).toStrictEqual(new Date());
      });
    });

    describe('when invalid', () => {
      it('fails to create because of unique constraint', () => {
        const dearest = sdr.create('Izuku Midoriya', 5, 4);
        expect(dearest).toBe(null);
      });
    });
  });

  describe('#update', () => {
    it('updates successfully', () => {
      const now = new Date('2020/7/29 01:00:00');
      Date.now = jest.fn().mockReturnValue(now.valueOf());
      jest.spyOn(global, 'Date').mockImplementation();

      const dearest = new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1));
      const updatedDearest = sdr.update(dearest, 4, 4);
      expect(updatedDearest.getTypeId().toNumber()).toBe(4);
      expect(updatedDearest.getNotificationPeriodId().toNumber()).toBe(4);
      expect(updatedDearest.getLastContactedDate().toDate()).toStrictEqual(new Date());
    });
  });
});
