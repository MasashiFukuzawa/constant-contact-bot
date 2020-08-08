export class DearestNotificationPeriodId {
  notificationPeriodId: number;
  constructor(notificationPeriodId: number) {
    if (!notificationPeriodId) throw new Error("DearestNotificationPeriodIdが存在しません");
    if (isNaN(notificationPeriodId)) throw new Error("DearestNotificationPeriodIdはnumber型でなければなりません");
    this.notificationPeriodId = notificationPeriodId;
  }

  toNumber(): number {
    return this.notificationPeriodId;
  }
}
