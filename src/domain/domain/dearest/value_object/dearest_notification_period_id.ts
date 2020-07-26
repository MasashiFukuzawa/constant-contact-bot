export class DearestNotificationPeriodId {
  notificationPeriodId: number;
  constructor(notificationPeriodId: number) {
    if (notificationPeriodId === null) throw new Error("DearestPeriodIdが存在しません");
    this.notificationPeriodId = notificationPeriodId;
  }

  toNumber(): number {
    return this.notificationPeriodId;
  }
}
