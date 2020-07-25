import { DearestRepositoryInterface } from "../../domain/domain/dearest/dearest_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetDearestRepository implements DearestRepositoryInterface {
  getAll(): any[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("dearests");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const allDearestsData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    return allDearestsData.filter((e) => !!e[0]);
  }
}
