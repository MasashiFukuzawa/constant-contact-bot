import { NotificationPeriodRepositoryInterface } from '../interface/notification_period/NotificationPeriodRepositoryInterface';
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class NotificationPeriodRepository implements NotificationPeriodRepositoryInterface {
  getAllNotificationPeriodsData(): any[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("notification_periods");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const allNotificationPeriodsData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    // NOTE: getLastRowで空白行まで取得することがあるためこの時点で不要な行データは除去
    return allNotificationPeriodsData.filter((e) => !!e[0]);
  }
}
