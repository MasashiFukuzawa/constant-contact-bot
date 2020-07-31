import { DearestUpdateInteractor } from "../../../src/domain/application/dearest/dearest_update_interactor";
import { DearestUpdatePresenter } from "../../../src/webhook_app/dearest/update/dearest_update_presenter";
import { SpreadsheetDearestRepository } from "../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { Dearest } from "../../../src/domain/domain/dearest/dearest";

describe('DearestUpdateInteractor', () => {
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
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;
  UrlFetchApp.fetch = jest.fn();

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      it('sends a update message successfully', () => {
        const sdr = new SpreadsheetDearestRepository();
        const dup = new DearestUpdatePresenter();
        const dui = new DearestUpdateInteractor(sdr, dup);
        const replyToken = 'some_reply_token';
        const name = 'Izuku Midoriya';
        const typeId = null;
        const notificationPeriodId = null;
        jest.spyOn(SpreadsheetDearestRepository.prototype, 'getAll')
          .mockReturnValue([
            new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)),
            new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)),
            new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)),
            new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)),
          ]);
        dui.handle(replyToken, name, typeId, notificationPeriodId)
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});