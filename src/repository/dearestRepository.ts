import { DearestRepositoryInterface } from '../interface/dearest/deareastRepositoryInterface';
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class DearestRepository implements DearestRepositoryInterface {
  getAllDearestsData(): any[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("dearests");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const allDearestsData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    // NOTE: getLastRowで空白行まで取得することがあるためこの時点で不要な行データは除去
    return allDearestsData.filter((e) => !!e[0]);
  }
}
