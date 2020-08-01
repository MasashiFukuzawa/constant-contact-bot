import { Type } from "../../domain/domain/type/type";
import { TypeRepositoryInterface } from "../../domain/domain/type/type_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetTypeRepository implements TypeRepositoryInterface {
  getAll(): Type[] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("types");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const rawData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    const fullData = rawData.filter(e => !!e[0]);
    return this.map(fullData);
  }

  private map(fullData: any[][]): Type[] {
    return fullData.map(e => {
      return new Type(e[0], e[1]);
    });
  }
}
