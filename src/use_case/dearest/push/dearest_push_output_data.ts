import { Dearest } from "../../../domain/domain/dearest/dearest";
import { NotificationPeriod } from "../../../domain/domain/notification_period/notification_period";

export class DearestPushOutputData {
  getMessages(
    dearests: Dearest[],
    notificationPeriods: NotificationPeriod[]
  ): { name: string, message: string }[] {
    const messages = dearests.map(e => {
      const name = e.getName().toString();
      const birthday = e.getBirthday().toString();
      const today: string = Moment.moment().format('M/D');
      if (today === birthday) {
        return { name, message: this.getBirthdayMessage(name) };
      }

      const notificationPeriodId = e.getNotificationPeriodId().toNumber();
      const lastContactedDate = e.getLastContactedDate().toDate();
      const notificationPeriod = this.getNotificationPeriod(notificationPeriods, notificationPeriodId);
      const term = notificationPeriod.getTerm().toNumber();
      const unit = notificationPeriod.getUnit().toString();
      const now = Moment.moment();
      const targetDate: Date = now.subtract(term, unit).toDate();
      if (lastContactedDate < targetDate) {
        return { name, message: this.getDefaultMessage(name, `${term}${unit}`) };
      }
    });
    return messages.filter(e => !!e);
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

  private getBirthdayMessage(name: string): string {
    return `今日は ${name} の誕生日です！\n親愛なる ${name} にお祝いのメッセージを送りましょう！`
  }

  private getDefaultMessage(name: string, period: string): string {
    let translatedPeriod: string;
    switch (period) {
      case '1week':
        translatedPeriod = '1週間';
        break;
      case '3months':
        translatedPeriod = '3ヶ月';
        break;
      case '6months':
        translatedPeriod = '半年';
        break;
      case '1year':
        translatedPeriod = '1年';
          break;
    }
    return `${translatedPeriod}ぶりに ${name} と連絡を取ってみませんか？`;
  }
}
