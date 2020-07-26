export class NotificationPeriodId {
  id: number;
  constructor(id: number) {
    if (id === null) throw new Error("NotificationPeriodIdが存在しません");
    this.id = id;
  }

  toNumber(): number {
    return this.id;
  }
}
