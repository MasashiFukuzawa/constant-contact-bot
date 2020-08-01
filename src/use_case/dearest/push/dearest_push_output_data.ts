import { Dearest } from "../../../domain/domain/dearest/dearest";
import { NotificationPeriod } from "../../../domain/domain/notification_period/notification_period";

export class DearestPushOutputData {
  extractDearestNames(
    mappedDearestsData: Dearest[],
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): string[] {
    const targetData = this.filterDearestData(mappedDearestsData, mappedNotificationPeriodsData);
    return targetData.map(e => e.getName().toString());
  }

  private filterDearestData(
    mappedDearestsData: Dearest[],
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): Dearest[] {
    return mappedDearestsData.filter(e => {
      const notificationPeriodId = e.getNotificationPeriodId().toNumber();
      const lastContactedDate = e.getLastContactedDate().toDate();
      const now = Moment.moment();
      const notificationPeriod = this.getNotificationPeriod(notificationPeriodId, mappedNotificationPeriodsData);
      const targetDate: Date =
        now.subtract(
          notificationPeriod.getTerm().toNumber(),
          notificationPeriod.getUnit().toString()
        ).toDate();
      return lastContactedDate < targetDate;
    })
  }

  private getNotificationPeriod(
    notificationPeriodId: number,
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): NotificationPeriod {
    return this.selectNotificationPeriodData(mappedNotificationPeriodsData, notificationPeriodId);
  }

  private selectNotificationPeriodData(
    mappedNotificationPeriodsData: NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const selectedData = mappedNotificationPeriodsData.filter(e => {
      return e.getId().toNumber() === notificationPeriodId;
    })[0];
    if (selectedData === null) {
      throw new Error('notification_periodsテーブル中に、該当するNotificationPeriodが見つかりませんでした');
    };
    return selectedData;
  }
}
