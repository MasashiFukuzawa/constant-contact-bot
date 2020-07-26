import { TypeRepositoryInterface } from "../../domain/domain/type/type_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetTypeRepository implements TypeRepositoryInterface {
  getAll(): any[][] {
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    const ws: Sheet = ss.getSheetByName("types");
    const lastRow = ws.getLastRow();
    const lastCol = ws.getLastColumn();
    const allTypesData = ws.getRange(2, 1, lastRow, lastCol).getValues();
    return allTypesData.filter((e) => !!e[0]);
  }
}
