export class NotificationPeriodTerm {
  term: number;
  constructor(term: number) {
    if (term === null) throw new Error("NotificationPeriodTermが存在しません");
    this.term = term;
  }

  toNumber(): number {
    return this.term;
  }
}
