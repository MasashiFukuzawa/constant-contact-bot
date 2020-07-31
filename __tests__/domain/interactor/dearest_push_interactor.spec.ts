import { Dearest } from "../../../src/domain/domain/dearest/dearest";
import { NotificationPeriod } from "../../../src/domain/domain/notification_period/notification_period";
import { DearestPushInteractor } from "../../../src/domain/application/dearest/dearest_push_interactor";
import { SpreadsheetDearestRepository } from "../../../src/spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { SpreadsheetNotificationPeriodRepository } from "../../../src/spreadsheet_infrastructure/notification_periods/spreadsheet_notification_period_repository";
import { DearestPushPresenter } from "../../../src/webhook_app/dearest/push/dearest_push_presenter";

describe('DearestPushInteractor', () => {
  Moment.moment = jest.fn(() => ({
    subtract: jest.fn(() => ({
      toDate: jest.fn(() => new Date(2020, 4, 25))
    })),
  }));
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
        ])
      })),
    })),
  })) as any;
  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;
  UrlFetchApp.fetch = jest.fn();

  describe('SpreadsheetInfrastructure', () => {
    const sdr = new SpreadsheetDearestRepository();
    const snpr = new SpreadsheetNotificationPeriodRepository();
    jest.spyOn(SpreadsheetDearestRepository.prototype, 'getAll')
      .mockReturnValue([
        new Dearest(1, 'Izuku Midoriya', 1, 3, new Date(2020, 1, 1)),
        new Dearest(2, 'Katsuki Bakugo', 2, 3, new Date(2020, 3, 1)),
        new Dearest(3, 'Ochako Uraraka', 3, 1, new Date(2020, 5, 1)),
        new Dearest(4, 'Shoto Todoroki', 4, 2, new Date(2020, 7, 1)),
      ]);
    jest.spyOn(SpreadsheetNotificationPeriodRepository.prototype, 'getAll')
      .mockReturnValue([
        new NotificationPeriod(1, 1, 'week'),
        new NotificationPeriod(2, 3, 'months'),
        new NotificationPeriod(3, 6, 'months'),
        new NotificationPeriod(4, 1, 'year'),
      ]);
    describe('#handle', () => {
      it('pushes messages successfully', () => {
        const dpp = new DearestPushPresenter();
        const das = new DearestPushInteractor(sdr, snpr, dpp);
        das.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(2);
      });
    });
  });
});
