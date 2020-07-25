export interface NotificationPeriodApplicationServiceInterface {
  getNotificationPeriod(notificationPeriodId: number): { term: number, unit: string };
}
