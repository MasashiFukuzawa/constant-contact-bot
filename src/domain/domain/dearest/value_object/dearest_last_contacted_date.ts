export class DearestLastContactedDate {
  lastContactedDate: Date;
  constructor(lastContactedDate: Date) {
    if (!lastContactedDate) throw new Error("DearestLastContactedDateが存在しません");
    if (typeof lastContactedDate !== 'object') throw new Error("DearestLastContactedDateはDate型でなければなりません");
    this.lastContactedDate = lastContactedDate;
  }

  toDate(): Date {
    return this.lastContactedDate;
  }
}
