import { Dearest } from "../../../domain/domain/dearest/dearest";
import { NotificationPeriod } from "../../../domain/domain/notification_period/notification_period";

export class DearestPushOutputData {
  getNames(dearests: Dearest[], notificationPeriods: NotificationPeriod[]): string[] {
    const targetData = this.filterDearestData(dearests, notificationPeriods);
    return targetData.map(e => e.getName().toString());
  }

  private filterDearestData(dearests: Dearest[], notificationPeriods: NotificationPeriod[]): Dearest[] {
    return dearests.filter(e => {
      const notificationPeriodId = e.getNotificationPeriodId().toNumber();
      const lastContactedDate = e.getLastContactedDate().toDate();
      const birthday = e.getBirthday().toString();

      const now = Moment.moment();
      const notificationPeriod = this.getNotificationPeriod(notificationPeriods, notificationPeriodId);
      const term = notificationPeriod.getTerm().toNumber();
      const unit = notificationPeriod.getUnit().toString();
      const targetDate: Date = now.subtract(term, unit).toDate();

      return this.isBirthday(birthday) || lastContactedDate < targetDate;
    })
  }

  private getNotificationPeriod(
    notificationPeriods: NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const selectedData = notificationPeriods.filter(e => {
      return e.getId().toNumber() === notificationPeriodId;
    })[0];
    if (selectedData) {
      return selectedData;
    } else {
      const errorMessage = 'notification_periodsテーブル中に、該当するNotificationPeriodが見つかりませんでした';
      throw new Error(`${errorMessage}: notificationPeriodId = ${notificationPeriodId}`);
    };
  }

  private isBirthday(birthday: string): boolean {
    const today: string = Moment.moment().format('M/D');
    return today === birthday;
  }
}
