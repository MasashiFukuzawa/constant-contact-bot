import { NotificationPeriodRepositoryInterface } from "../../domain/domain/notification_period/notification_period_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetNotificationPeriodRepository implements NotificationPeriodRepositoryInterface {
  getAll(): any[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("notification_periods");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const allNotificationPeriodsData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    return allNotificationPeriodsData.filter((e) => !!e[0]);
  }
}
