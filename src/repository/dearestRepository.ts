import { DearestRepositoryInterface } from '../interface/dearest/deareastRepositoryInterface';
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class DearestRepository implements DearestRepositoryInterface {
  getNames(): string[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("dearests");
    const lastRow: number = ws.getLastRow();
    const allDearests: string[][] = ws.getRange(2, 2, lastRow - 1, 1).getValues();
    return allDearests;
  }
}
