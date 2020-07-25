import { NotificationPeriod } from '../../types/notification_period';
import { NotificationPeriodApplicationServiceInterface } from '../../interface/notification_period/NotificationPeriodApplicationServiceInterface';
import { NotificationPeriodRepositoryInterface } from '../../interface/notification_period/NotificationPeriodRepositoryInterface';

export class NotificationPeriodApplicationService implements NotificationPeriodApplicationServiceInterface {
  constructor(
    private readonly notificationPeriodRepository: NotificationPeriodRepositoryInterface,
  ) {}

  getNotificationPeriod(notificationPeriodId: number): NotificationPeriod {
    const rawData = this.notificationPeriodRepository.getAllNotificationPeriodsData();
    const allNotificationPeriodsData = this.convertToHash(rawData);
    return this.selectNotificationPeriodData(allNotificationPeriodsData, notificationPeriodId);
  }

  private convertToHash(rawData: any[][]): NotificationPeriod[] {
    return rawData.map((d) => {
      return {
        id: d[0],
        term: d[1],
        unit: d[2]
      };
    });
  }

  private selectNotificationPeriodData(
    allNotificationPeriodsData: NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const selectedData = allNotificationPeriodsData.filter((d) => d.id === notificationPeriodId)[0];
    // TODO: domain層にvalidation書く
    if (selectedData === null) throw new Error;
    return selectedData;
  }
}
