import { DearestDeleteInteractor } from "../../../src/domain/application/dearest/dearest_delete_interactor";
import { SpreadsheetDearestRepository } from "../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { DearestReplyPresenter } from "../../../src/webhook_app/dearest/presenter/dearest_reply_presenter";
import { Dearest } from "../../../src/domain/domain/dearest/dearest";

describe('DearestDeleteInteractor', () => {
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
        clear: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;

  UrlFetchApp.fetch = jest.fn();

  Moment.moment = jest.fn(() => ({
    format: jest.fn(() => '2020/1/1')
  }));

  jest.spyOn(SpreadsheetDearestRepository.prototype, 'getAll')
    .mockReturnValue([
      new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1), '7/15'),
      new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1), '4/20'),
      new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1), '12/27'),
      new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1), '1/11'),
    ]);

  const sdr = new SpreadsheetDearestRepository();
  const ddp = new DearestReplyPresenter();
  const ddi = new DearestDeleteInteractor(sdr, ddp);
  const replyToken = 'some_reply_token';

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      it('sends a delete message successfully', () => {
        ddi.handle(replyToken, 'Izuku Midoriya');
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
