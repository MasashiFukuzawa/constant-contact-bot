export class DearestNotificationPeriodId {
  notificationPeriodId: number;
  constructor(notificationPeriodId: number) {
    if (notificationPeriodId === null) throw new Error("DearestNotificationPeriodIdが存在しません");
    if (typeof notificationPeriodId !== 'number') throw new Error("DearestNotificationPeriodIdはnumber型でなければなりません");
    this.notificationPeriodId = notificationPeriodId;
  }

  toNumber(): number {
    return this.notificationPeriodId;
  }
}
