import { Dearest } from "../../domain/domain/dearest/dearest";
import { DearestRepositoryInterface } from "../../domain/domain/dearest/dearest_repository_interface";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SpreadsheetDearestRepository implements DearestRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: Dearest[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  getAll(): Dearest[] {
    if (this.fullData) return this.fullData;
    const rawData = this.sheet.getRange(2, 1, this.lastRow, this.lastCol).getValues();
    const fullData = rawData.filter((e) => !!e[0]);
    return this.map(fullData);
  }

  findByName(name: string): Dearest | null {
    const dearest = this.fullData.filter(d => {
      return d.getName().toString() === name;
    })[0];
    return dearest === undefined ? null : dearest;
  }

  update(dearest: Dearest, typeId: number | null, notificationPeriodId: number | null): Dearest {
    const dearestId = dearest.getId().toNumber();
    const tId = typeId || dearest.getTypeId().toNumber();
    const npId = notificationPeriodId || dearest.getNotificationPeriodId().toNumber();
    const now = new Date();
    this.sheet.getRange(dearestId + 1, 3, this.lastCol)
      .setValues([[tId, npId, now]]);
    dearest.setTypeId(tId);
    dearest.setNotificationPeriodId(npId);
    dearest.setLastContactedDate(now);
    return dearest;
  }

  private getSheet(): Sheet {
    if (this.sheet) return this.sheet;
    const ss: Spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID")
    );
    return ss.getSheetByName("dearests");
  }

  private getLastRow(): number {
    if (this.lastRow) return this.lastRow;
    return this.sheet.getLastRow();
  }

  private getLastColumn(): number {
    if (this.lastCol) return this.lastCol;
    return this.sheet.getLastColumn();
  }

  private map(fullData: any[][]): Dearest[] {
    return fullData.map((d) => {
      return new Dearest(d[0], d[1], d[2], d[3], d[4]);
    });
  }
}
