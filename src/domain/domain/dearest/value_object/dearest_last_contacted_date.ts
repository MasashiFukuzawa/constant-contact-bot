export class DearestLastContactedDate {
  lastContactedDate: Date;
  constructor(lastContactedDate: Date) {
    if (lastContactedDate === null) throw new Error("DearestLastContactedDateが存在しません");
    this.lastContactedDate = lastContactedDate;
  }

  toDate(): Date {
    return this.lastContactedDate;
  }
}
