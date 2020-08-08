import { DearestCreateInteractor } from "../../../src/domain/application/dearest/dearest_create_interactor";
import { DearestCreatePresenter } from "../../../src/webhook_app/dearest/create/dearest_create_presenter";
import { SpreadsheetDearestRepository } from "../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { Dearest } from "../../../src/domain/domain/dearest/dearest";

describe('DearestCreateInteractor', () => {
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

  const UrlFetchMock = UrlFetchApp.fetch = jest.fn();

  Moment.moment = jest.fn(() => ({
    format: jest.fn(() => '2020/8/1')
  }));

  jest.spyOn(SpreadsheetDearestRepository.prototype, 'getAll')
    .mockReturnValue([
      new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'),
      new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1), '4/20'),
      new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), '12/27'),
      new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1), '1/11'),
    ]);

  const sdr = new SpreadsheetDearestRepository();
  const dcp = new DearestCreatePresenter();
  const dci = new DearestCreateInteractor(sdr, dcp);
  const name = 'All Might';
  const typeId = 5;
  const notificationPeriodId = 4;
  const lastContactedDate = new Date(2020, 8, 1);
  const birthday = '6/10';
  const replyToken = 'some_reply_token';

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      describe('when valid', () => {
        it('sends a create message successfully', () => {
          jest.spyOn(SpreadsheetDearestRepository.prototype, 'findByName')
            .mockReturnValue(new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'));
          dci.handle(replyToken, name, typeId, notificationPeriodId, lastContactedDate, birthday);
          expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
          UrlFetchMock.mockRestore();
        });
      });

      describe('when invalid', () => {
        it('sends a create message successfully', () => {
          jest.spyOn(SpreadsheetDearestRepository.prototype, 'findByName').mockReturnValue(null);
          dci.handle(replyToken, name, typeId, notificationPeriodId, lastContactedDate, birthday);
          expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
