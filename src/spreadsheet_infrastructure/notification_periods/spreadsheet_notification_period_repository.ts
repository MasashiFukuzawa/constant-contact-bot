import { NotificationPeriod } from "../../domain/domain/notification_period/notification_period";
import { NotificationPeriodRepositoryInterface } from "../../domain/domain/notification_period/notification_period_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetNotificationPeriodRepository implements NotificationPeriodRepositoryInterface {
  getAll(): NotificationPeriod[] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("notification_periods");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const rawData = ws.getRange(2, 1, lastRow - 1, lastCol).getValues();
    const fullData = rawData.filter(e => !!e[0]);
    return this.map(fullData);
  }

  private map(fullData: any[][]): NotificationPeriod[] {
    return fullData.map(e => {
      return new NotificationPeriod(e[0], e[1], e[2]);
    });
  }
}
