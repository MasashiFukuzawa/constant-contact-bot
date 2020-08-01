export class DearestLastContactedDate {
  lastContactedDate: Date;
  constructor(lastContactedDate: Date) {
    if (lastContactedDate === null) throw new Error("DearestLastContactedDateが存在しません");
    if (typeof lastContactedDate !== 'object') throw new Error("DearestIdはDate型ででなければなりません");
    this.lastContactedDate = lastContactedDate;
  }

  toDate(): Date {
    return this.lastContactedDate;
  }
}
