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
    const fullData = rawData.filter(e => !!e[0]);
    return this.map(fullData);
  }

  findByName(name: string): Dearest | null {
    const dearest = this.fullData.filter(e => {
      return e.getName().toString() === name;
    })[0];
    return dearest === undefined ? null : dearest;
  }

  create(name: string, typeId: number, notificationPeriodId: number, lastContactedDate: Date): Dearest | null {
    const isUnique = !this.findByName(name);
    if (Dearest.isValid(name, typeId, notificationPeriodId, isUnique)) {
      const id = Dearest.issueNewDearestId(this.lastRow);
      this.sheet.getRange(id + 1, 1, 1, this.lastCol)
        .setValues([[id, name, typeId, notificationPeriodId, lastContactedDate]]);
      return new Dearest(id, name, typeId, notificationPeriodId, lastContactedDate);
    } else {
      return null;
    }
  }

  update(dearest: Dearest, typeId: number | null, notificationPeriodId: number | null): Dearest {
    const dearestId = dearest.getId().toNumber();
    const tId = typeId || dearest.getTypeId().toNumber();
    const npId = notificationPeriodId || dearest.getNotificationPeriodId().toNumber();
    const now = new Date();
    this.sheet.getRange(dearestId + 1, 1, 1, this.lastCol)
      .setValues([[dearestId, dearest.getName().toString(), tId, npId, now]]);
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
    return fullData.map(e => {
      return new Dearest(e[0], e[1], e[2], e[3], e[4]);
    });
  }
}
