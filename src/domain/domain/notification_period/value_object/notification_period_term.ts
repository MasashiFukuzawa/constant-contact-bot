export class NotificationPeriodTerm {
  term: number;
  constructor(term: number) {
    if (!term) throw new Error("NotificationPeriodTermが存在しません");
    this.term = term;
  }

  toNumber(): number {
    return this.term;
  }
}
