import { SpreadsheetDearestRepository } from "../../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { Dearest } from "../../../../src/domain/domain/dearest/dearest";
import { BirthdayMigrateInteractor } from "../../../../src/domain/application/batch/birthday_migrate_interactor";

describe('BirthdayMigrateInteractor', () => {
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
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;

  console.log = jest.fn(() => 'migration success');

  jest.spyOn(SpreadsheetDearestRepository.prototype, 'getAll')
    .mockReturnValue([
      new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), null),
      new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1), null),
      new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), null),
      new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1), null),
    ]);

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      it('sends a create message successfully', () => {
        const sdr = new SpreadsheetDearestRepository();
        const dci = new BirthdayMigrateInteractor(sdr);
        const inputData = [
          { name: 'Izuku Midoriya', birthday: '7/15' },
          { name: 'Katsuki Bakugo', birthday: '4/20' },
          { name: 'Ochako Uraraka', birthday: '12/27' },
          { name: 'Shoto Todoroki', birthday: '1/11' }
        ]
        dci.handle(inputData);
        expect(console.log).toHaveBeenCalledTimes(4);
      });
    });
  });
});
